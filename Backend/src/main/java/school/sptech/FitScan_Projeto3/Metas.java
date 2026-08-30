package school.sptech.FitScan_Projeto3;

import java.time.LocalDate;

public class Metas {
    private Integer id;
    private String nome;
    private Double pesoAtual;
    private Double pesoObjetivo;
    private Double altura;
    private LocalDate prazoMeta;
    private String observacao;

    public Metas() {
    }

    public Metas(Integer id, String nome, Double pesoAtual, Double pesoObjetivo, Double altura, LocalDate prazoMeta, String observacao) {
        this.id = id;
        this.nome = nome;
        this.pesoAtual = pesoAtual;
        this.pesoObjetivo = pesoObjetivo;
        this.altura = altura;
        this.prazoMeta = prazoMeta;
        this.observacao = observacao;
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

    public Double getPesoObjetivo() {
        return pesoObjetivo;
    }

    public void setPesoObjetivo(Double pesoObjetivo) {
        this.pesoObjetivo = pesoObjetivo;
    }

    public Double getAltura() {
        return altura;
    }

    public void setAltura(Double altura) {
        this.altura = altura;
    }

    public LocalDate getPrazoMeta() {
        return prazoMeta;
    }

    public void setPrazoMeta(LocalDate prazoMeta) {
        this.prazoMeta = prazoMeta;
    }

    public String getObservacao() {
        return observacao;
    }

    public void setObservacao(String observacao) {
        this.observacao = observacao;
    }

    @Override
    public String toString() {
        return "Metas{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", pesoAtual=" + pesoAtual +
                ", pesoObjetivo=" + pesoObjetivo +
                ", altura=" + altura +
                ", prazoMeta=" + prazoMeta +
                ", observacao='" + observacao + '\'' +
                '}';
    }
}
