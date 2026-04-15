import fs from "fs";

function arg(nome) {
  const i = process.argv.indexOf(`--${nome}`);
  return i >= 0 ? (process.argv[i + 1] ?? "") : "";
}

const acao = arg("acao").trim();
const id = arg("id").trim();
const titulo = arg("titulo").trim();
const descricao = arg("descricao").trim();
const valor = arg("valor").trim();

const arquivo = "servicos.json";

let dados = { servicos: [] };

if (fs.existsSync(arquivo)) {
  try {
    dados = JSON.parse(fs.readFileSync(arquivo, "utf8") || "{}");
  } catch {
    dados = { servicos: [] };
  }
}

if (!Array.isArray(dados.servicos)) dados.servicos = [];

if (acao === "criar") {
  if (!titulo || !descricao || !valor) {
    console.error("Faltou titulo/descricao/valor");
    process.exit(1);
  }

  dados.servicos.push({
    id: Date.now(),
    titulo,
    descricao,
    valor,
    status: "disponivel"
  });

} else if (acao === "aceitar") {
  const numId = Number(id);
  const servico = dados.servicos.find(s => s.id === numId);

  if (!servico) {
    console.error("Serviço não encontrado:", id);
    process.exit(1);
  }

  servico.status = "aceito";
} else {
  console.error("Ação inválida:", acao);
  process.exit(1);
}

fs.writeFileSync(arquivo, JSON.stringify(dados, null, 2) + "\n", "utf8");
console.log("OK: servicos.json atualizado");
``
