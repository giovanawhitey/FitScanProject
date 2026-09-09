package school.sptech.FitScan_Projeto3;

import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.web.bind.annotation.*;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@RestController
@RequestMapping("/metas")
@CrossOrigin(origins = "http://localhost:5173")
public class MetasController {

    private final JdbcTemplate jdbcTemplate;

    public MetasController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }


    private Double calcularImc(Double peso, Double altura) {
        return peso / (altura * altura);
    }


    private String classificarImc(Double imc) {


        if (imc < 18.5) {
            return "Abaixo da faixa recomendada";

        } else if (imc < 25) {
            return "Dentro da faixa saudável";

        } else if (imc < 30) {
            return "Acima da faixa recomendada";

        } else {
            return "Acima da faixa saudável";
        }
    }


    private String gerarSugestao(Double imc, String objetivo) {
        if (objetivo.equalsIgnoreCase("EMAGRECER")) {

            if (imc < 18.5) {
                return "Seu IMC está abaixo da faixa recomendada. Antes de buscar o emagrecimento, vale priorizar uma alimentação equilibrada e o cuidado com a saúde.";

            } else if (imc < 25) {
                return "Seu IMC está dentro de uma faixa saudável. Se o objetivo é emagrecer, procure fazer mudanças leves na alimentação e manter uma rotina de atividades físicas.";

            } else if (imc < 30) {
                return "Seu IMC está acima da faixa recomendada. Uma alimentação equilibrada e uma rotina de exercícios podem ajudar você a alcançar seu objetivo de forma gradual.";

            } else {
                return "Seu IMC está acima da faixa saudável. Pequenas mudanças na alimentação e na rotina podem contribuir para uma evolução gradual e saudável.";
            }

        } else if (objetivo.equalsIgnoreCase("GANHAR_MASSA")) {

            if (imc < 18.5) {
                return "Seu IMC está abaixo da faixa recomendada. Para ganhar massa muscular, priorize uma alimentação adequada, boas fontes de proteína e exercícios de força.";

            } else if (imc < 25) {
                return "Seu IMC está dentro de uma faixa saudável. Para ganhar massa muscular, combine exercícios de força com uma alimentação equilibrada e boas fontes de proteína.";

            } else if (imc < 30) {
                return "Seu IMC está acima da faixa recomendada. É possível trabalhar o ganho de massa muscular enquanto mantém uma alimentação equilibrada e cuida da composição corporal.";

            } else {
                return "Seu IMC está acima da faixa saudável. Uma rotina de exercícios de força e uma alimentação equilibrada podem ajudar na evolução da sua composição corporal.";
            }
        }

        return "Não foi possível identificar o objetivo informado.";
    }


    private void calcularDados(Metas meta) {

        Double imc = calcularImc(
                meta.getPesoAtual(),
                meta.getAltura()
        );

        meta.setImc(imc);

        String classificacao = classificarImc(imc);
        meta.setClassificacao(classificacao);

        String sugestao = gerarSugestao(
                imc,
                meta.getObjetivo()
        );

        meta.setSugestao(sugestao);
    }


    @PostMapping
    public ResponseEntity<?> cadastrarMetas(@RequestBody Metas novoCad) {

        System.out.println("OBJETO RECEBIDO:");
        System.out.println(novoCad);

        if (novoCad.getNome() == null || novoCad.getNome().isBlank()) {
            return ResponseEntity.status(400).body("Nome inválido");
        }

        if (novoCad.getDataNascimento() == null) {
            return ResponseEntity.status(400).body("Data de nascimento inválida");
        }

        if (novoCad.getPesoAtual() == null || novoCad.getPesoAtual() <= 0) {
            return ResponseEntity.status(400).body("Peso atual inválido");
        }

        if (novoCad.getAltura() == null || novoCad.getAltura() <= 0) {
            return ResponseEntity.status(400).body("Altura inválida");
        }

        if (novoCad.getObjetivo() == null || novoCad.getObjetivo().isBlank()) {
            return ResponseEntity.status(400).body("Objetivo inválido");
        }

        String sql = """
        INSERT INTO metaScan
        (nome, dataNascimento, pesoAtual, altura, objetivo)
        VALUES (?, ?, ?, ?, ?)
        """;

        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(con -> {

            PreparedStatement ps = con.prepareStatement(
                    sql,
                    Statement.RETURN_GENERATED_KEYS
            );

            ps.setString(1, novoCad.getNome());
            ps.setObject(2, novoCad.getDataNascimento());
            ps.setDouble(3, novoCad.getPesoAtual());
            ps.setDouble(4, novoCad.getAltura());
            ps.setString(5, novoCad.getObjetivo());

            return ps;

        }, keyHolder);

        Number idGerado = keyHolder.getKey();
        Integer idInserido = idGerado.intValue();

        novoCad.setId(idInserido);

        return ResponseEntity.status(201).body(novoCad);
    }


    private boolean validarCadastro(Metas meta) {

        if (meta.getNome() == null || meta.getNome().isBlank()) {
            return true;
        }

        if (meta.getDataNascimento() == null) {
            return true;
        }

        if (meta.getPesoAtual() == null || meta.getPesoAtual() <= 0) {
            return true;
        }

        if (meta.getAltura() == null || meta.getAltura() <= 0) {
            return true;
        }

        if (meta.getObjetivo() == null || meta.getObjetivo().isBlank()) {
            return true;
        }

        return false;
    }


    @GetMapping
    public ResponseEntity<List<Metas>> listarMetas() {

        String sql = "SELECT * FROM metaScan ORDER BY id DESC";

        List<Metas> metas = jdbcTemplate.query(
                sql,
                new BeanPropertyRowMapper<>(Metas.class)
        );

        for (Metas meta : metas) {
            calcularDados(meta);
        }

        return ResponseEntity.status(200).body(metas);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Metas> buscarMetaPorId(@PathVariable Integer id) {

        String sql = "SELECT * FROM metaScan WHERE id = ?";

        List<Metas> metas = jdbcTemplate.query(
                sql,
                new BeanPropertyRowMapper<>(Metas.class),
                id
        );

        if (metas.isEmpty()) {
            return ResponseEntity.status(404).build();
        }

        Metas meta = metas.get(0);

        calcularDados(meta);

        return ResponseEntity.status(200).body(meta);
    }
}