package school.sptech.FitScan_Projeto3;

import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;

import java.sql.PreparedStatement;
import java.sql.Statement;

import java.util.List;

@RestController
@RequestMapping("/metas")
@CrossOrigin(origins = "http://localhost:5173") // aqui eu to direcionando
public class MetasController {
    private final JdbcTemplate jdbcTemplate;

    public MetasController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // começar pelo o cadastro
    @PostMapping
    public ResponseEntity<Metas> cadastrarMetas(@RequestBody Metas novoCad) {
        if (novoCad.getNome() == null || novoCad.getNome().isBlank()) {
            return ResponseEntity.status(400).build();
        }
        String sql = "INSERT INTO metaScan (nome, pesoAtual, pesoObjetivo, altura, prazoMeta, observacao) VALUES (?, ?, ?, ?, ?, ?)";
        KeyHolder keyHolder = new GeneratedKeyHolder(); // eh pra guarda o id
        jdbcTemplate.update(con -> {
            PreparedStatement ps = con.prepareStatement(sql,
                    Statement.RETURN_GENERATED_KEYS
            );

            ps.setString(1, novoCad.getNome());
            ps.setDouble(2, novoCad.getPesoAtual());
            ps.setDouble(3, novoCad.getPesoObjetivo());
            ps.setDouble(4, novoCad.getAltura());
            ps.setObject(5, novoCad.getPrazoMeta());
            ps.setString(6, novoCad.getObservacao());
            return ps;
        }, keyHolder);
        Integer idInserido = keyHolder.getKeyAs(Integer.class);
        novoCad.setId(idInserido);

        return ResponseEntity.status(201).body(novoCad);
    }


    @GetMapping
    public ResponseEntity<List<Metas>> listarMetas() {
        String sql = "SELECT * FROM metaScan";
        List<Metas> metas = jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Metas.class));
        return ResponseEntity.status(200).body(metas);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Metas> buscarMetaPorId(@PathVariable Integer id) {
        String sql = "SELECT * FROM metaScan WHERE id = ?";

        List<Metas> metas = jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Metas.class), id);
        if (metas.isEmpty()) {
            return ResponseEntity.status(404).build();
        }
        return ResponseEntity.status(200).body(metas.get(0));
    }
}
