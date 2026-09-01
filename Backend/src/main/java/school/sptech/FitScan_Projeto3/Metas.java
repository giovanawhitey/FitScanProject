package school.sptech.FitScan_Projeto3;

import java.time.LocalDate;

public class Metas {
    private Integer id;
    private String nome;
    private Double pesoAtual;
    private LocalDate dataNascimento;
    private Double altura;
    private String objetivo;
    private Double imc;
    private String classificacao;
    private String sugestao;


    public Metas() {
    }

    public Metas(Integer id, String nome, Double pesoAtual, LocalDate dataNascimento, Double altura, String objetivo, Double imc, String classificacao, String sugestao) {
        this.id = id;
        this.nome = nome;
        this.pesoAtual = pesoAtual;
        this.dataNascimento = dataNascimento;
        this.altura = altura;
        this.objetivo = objetivo;
        this.imc = imc;
        this.classificacao = classificacao;
        this.sugestao = sugestao;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Double getPesoAtual() {
        return pesoAtual;
    }

    public void setPesoAtual(Double pesoAtual) {
        this.pesoAtual = pesoAtual;
    }

    public Double getAltura() {
        return altura;
    }

    public void setAltura(Double altura) {
        this.altura = altura;
    }

    public String getObjetivo() {
        return objetivo;
    }

    public void setObjetivo(String objetivo) {
        this.objetivo = objetivo;
    }

    public Double getImc() {
        return imc;
    }

    public void setImc(Double imc) {
        this.imc = imc;
    }

    public String getClassificacao() {
        return classificacao;
    }

    public void setClassificacao(String classificacao) {
        this.classificacao = classificacao;
    }

    public String getSugestao() {
        return sugestao;
    }

    public void setSugestao(String sugestao) {
        this.sugestao = sugestao;
    }

    public LocalDate getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
    }


    @Override
    public String toString() {
        return "Metas{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", pesoAtual=" + pesoAtual +
                ", dataNascimento=" + dataNascimento +
                ", altura=" + altura +
                ", objetivo='" + objetivo + '\'' +
                ", imc=" + imc +
                ", classificacao='" + classificacao + '\'' +
                ", sugestao='" + sugestao + '\'' +
                '}';
    }
}
