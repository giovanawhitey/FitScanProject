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
    public ResponseEntity<?> cadastrarMetas(@RequestBody Metas novoCad) {
        String erroValidacao = validarCadastro(novoCad);
        if (erroValidacao != null) {
            return ResponseEntity.badRequest().body(erroValidacao);
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

    private String validarCadastro(Metas meta) {
        if (meta == null) {
            return "O corpo da requisição não pode ser vazio.";
        }
        if (meta.getNome() == null || meta.getNome().isBlank()) {
            return "O nome é obrigatório.";
        }
        if (meta.getPesoAtual() == null) {
            return "O peso atual é obrigatório.";
        }
        if (meta.getPesoObjetivo() == null) {
            return "O peso objetivo é obrigatório.";
        }
        if (meta.getAltura() == null) {
            return "A altura é obrigatória.";
        }
        if (meta.getPrazoMeta() == null) {
            return "O prazo da meta é obrigatório.";
        }
        if (meta.getObservacao() == null || meta.getObservacao().isBlank()) {
            return "A observação é obrigatória.";
        }
        return null;
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
