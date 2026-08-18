import rawFinalCards from "./final-card-text.json";

export type Sphere = "hidrica" | "ambiental";
export type Card = {
  code: string;
  sphere: Sphere;
  category: string;
  title: string;
  question: string;
  yes: string;
  no: string;
  note?: string;
};
export type FinalCard = { code: string; sphere: Sphere; title: string; body: string };

export const categories = {
  hidrica: [
    ["1 A","Acesso à água"],["2 A","Cobrança de água"],["3 A","Construção de barragens"],["4 A","Furto de água"],["5 A","Águas subterrâneas"],["6 A","Partição e alocação"],["7.1 A","Governança da água"],
  ],
  ambiental: [
    ["1 B","Lançamento de efluentes"],["2 B","Resíduos sólidos"],["3 B","Questões agrícolas"],["4 B","Criação de animais"],["5 B","Desmatamento"],["6 B","Mineração"],["7 B","Construção civil"],
  ],
} satisfies Record<Sphere, string[][]>;

const H: Card[] = [
  {code:"1 A",sphere:"hidrica",category:"Acesso à água",title:"Acesso à água",question:"O proprietário do terreno impede o acesso à água, por exemplo, com cercas ou muros?",yes:"1.1 A",no:"2 A"},
  {code:"1.1 A",sphere:"hidrica",category:"Acesso à água",title:"Acesso à água",question:"O impedimento de acesso à propriedade ocorre por exigência de compensação financeira pelo uso da água?",yes:"1.1 F-A",no:"2 A"},
  {code:"2 A",sphere:"hidrica",category:"Cobrança de água",title:"Cobrança de água",question:"O acesso é permitido somente mediante cobrança para utilizar a água?",yes:"2 F-A",no:"END"},
  {code:"3 A",sphere:"hidrica",category:"Construção de barragens",title:"Construção de barragens",question:"Uma barragem está dificultando ou poderá dificultar o caminho da água até a demanda?",yes:"3.1 A",no:"END"},
  {code:"3.1 A",sphere:"hidrica",category:"Construção de barragens",title:"Construção de barragens",question:"A barragem possui outorga de obra hídrica?",yes:"3.2 A",no:"3.3 A",note:"Verifique previamente o sistema de dados sobre outorgas."},
  {code:"3.2 A",sphere:"hidrica",category:"Construção de barragens",title:"Construção de barragens",question:"A barragem possui licença ambiental?",yes:"3.4 A",no:"3.3 A",note:"Verifique previamente o sistema de licenciamento ambiental."},
  {code:"3.3 A",sphere:"hidrica",category:"Construção de barragens",title:"Construção de barragens",question:"A barragem ainda será instalada e está em etapa de licenciamento?",yes:"3.2 F-A",no:"3.3 F-A"},
  {code:"3.4 A",sphere:"hidrica",category:"Construção de barragens",title:"Construção de barragens",question:"A barragem possui cadastro no sistema de segurança de barragens?",yes:"3.4 F-A",no:"3.5 F-A"},
  {code:"4 A",sphere:"hidrica",category:"Furto de água",title:"Furto de água",question:"Você acredita que está ocorrendo furto ou retirada intencional de água?",yes:"4.1 A",no:"END"},
  {code:"4.1 A",sphere:"hidrica",category:"Furto de água",title:"Furto de água",question:"A retirada está ocorrendo em canais, lagos ou reservatórios?",yes:"4.2 A",no:"4.3 A"},
  {code:"4.2 A",sphere:"hidrica",category:"Furto de água",title:"Furto de água",question:"A vazão retirada está de acordo com a outorga e o acordo de alocação?",yes:"END",no:"4.2 F-A"},
  {code:"4.3 A",sphere:"hidrica",category:"Furto de água",title:"Furto de água",question:"A retirada está ocorrendo em uma adutora?",yes:"4.3 F-A",no:"END"},
  {code:"5 A",sphere:"hidrica",category:"Águas subterrâneas",title:"Exploração de águas subterrâneas",question:"Está ocorrendo uso de água subterrânea considerado indevido?",yes:"5.1 A",no:"END"},
  {code:"5.1 A",sphere:"hidrica",category:"Águas subterrâneas",title:"Exploração de águas subterrâneas",question:"Trata-se de exploração de água subterrânea que ainda irá ocorrer?",yes:"5.1 F-A",no:"5.2 A"},
  {code:"5.2 A",sphere:"hidrica",category:"Águas subterrâneas",title:"Exploração de águas subterrâneas",question:"A vazão retirada está de acordo com a outorga?",yes:"END",no:"5.2 F-A"},
  {code:"6 A",sphere:"hidrica",category:"Partição e alocação",title:"Partição e alocação de águas",question:"A água está destinada a outro uso supostamente mais importante, impedindo esta demanda?",yes:"6 F-A",no:"6.1 A"},
  {code:"6.1 A",sphere:"hidrica",category:"Partição e alocação",title:"Partição e alocação de águas",question:"Águas de um reservatório da bacia estão sendo transferidas para outra bacia?",yes:"6.1 F-A",no:"6.2 A"},
  {code:"6.2 A",sphere:"hidrica",category:"Partição e alocação",title:"Partição e alocação de águas",question:"A bacia de jusante está sendo prejudicada pelo uso ou liberação de água a montante?",yes:"6.1 F-A",no:"6.3 A"},
  {code:"6.3 A",sphere:"hidrica",category:"Partição e alocação",title:"Partição e alocação de águas",question:"Há suspeita de uso irregular de água por determinado usuário na bacia?",yes:"6.3 F-A",no:"END"},
  {code:"7.1 A",sphere:"hidrica",category:"Governança da água",title:"Governança da água",question:"O conflito envolve falta de articulação institucional ou participação nas decisões?",yes:"7.1 F-A",no:"END"},
];

const B: Card[] = [
  {code:"1 B",sphere:"ambiental",category:"Lançamento de efluentes",title:"Lançamento de efluentes",question:"Há lançamento de esgoto no solo, próximo a um rio ou riacho, no entorno de reservatórios (APP) ou diretamente no reservatório?",yes:"1 F-B",no:"1.1 B"},
  {code:"1.1 B",sphere:"ambiental",category:"Lançamento de efluentes",title:"Lançamento de efluentes",question:"O lançamento ocorre diretamente em rio ou riacho?",yes:"1.2 B",no:"1.3 B"},
  {code:"1.2 B",sphere:"ambiental",category:"Lançamento de efluentes",title:"Lançamento de efluentes",question:"O lançamento está regularizado quanto à outorga?",yes:"1.3 B",no:"1.2 F-B"},
  {code:"1.3 B",sphere:"ambiental",category:"Lançamento de efluentes",title:"Lançamento de efluentes",question:"A atividade é passível de licença ambiental?",yes:"1.4 B",no:"1.3 F-B"},
  {code:"1.4 B",sphere:"ambiental",category:"Lançamento de efluentes",title:"Lançamento de efluentes",question:"A atividade é de competência da União?",yes:"1.4 F-B",no:"1.5 B"},
  {code:"1.5 B",sphere:"ambiental",category:"Lançamento de efluentes",title:"Lançamento de efluentes",question:"A atividade produz impacto regional dentro do mesmo estado?",yes:"1.5 F-B",no:"1.6 B"},
  {code:"1.6 B",sphere:"ambiental",category:"Lançamento de efluentes",title:"Lançamento de efluentes",question:"O município possui órgão ambiental competente para licenciamento?",yes:"1.6 F-B",no:"1.5 F-B"},
  {code:"2 B",sphere:"ambiental",category:"Resíduos sólidos",title:"Descarte de resíduos sólidos",question:"Há descarte em margens, reservatórios, rios ou vias públicas?",yes:"2 F-B",no:"2.1 B"},
  {code:"2.1 B",sphere:"ambiental",category:"Resíduos sólidos",title:"Descarte de resíduos sólidos",question:"O descarte ocorre fora do corpo hídrico, mas em terreno ou via pública inadequada?",yes:"2.1 F-B",no:"END"},
  {code:"3 B",sphere:"ambiental",category:"Questões agrícolas",title:"Questões agrícolas",question:"Uma atividade agrícola parece prejudicar a qualidade da água?",yes:"3.1 B",no:"END"},
  {code:"3.1 B",sphere:"ambiental",category:"Questões agrícolas",title:"Questões agrícolas",question:"A atividade agrícola está em margem de rio ou reservatório?",yes:"3.1 F-B",no:"3.2 B"},
  {code:"3.2 B",sphere:"ambiental",category:"Questões agrícolas",title:"Questões agrícolas",question:"A atividade agrícola é passível de licença ambiental?",yes:"3.3 B",no:"3.2 F-B"},
  {code:"3.3 B",sphere:"ambiental",category:"Questões agrícolas",title:"Questões agrícolas",question:"A atividade é de competência da União?",yes:"3.3 F-B",no:"3.4 B"},
  {code:"3.4 B",sphere:"ambiental",category:"Questões agrícolas",title:"Questões agrícolas",question:"A atividade produz impacto regional dentro do mesmo estado?",yes:"3.4 F-B",no:"3.5 B"},
  {code:"3.5 B",sphere:"ambiental",category:"Questões agrícolas",title:"Questões agrícolas",question:"O município possui órgão ambiental competente para licenciamento?",yes:"3.5 F-B",no:"3.4 F-B"},
  {code:"4 B",sphere:"ambiental",category:"Criação de animais",title:"Questões agropecuárias",question:"Uma criação de animais parece prejudicar a qualidade da água?",yes:"4.1 B",no:"END"},
  {code:"4.1 B",sphere:"ambiental",category:"Criação de animais",title:"Questões agropecuárias",question:"A criação de animais está em margem de nascente, rio ou reservatório?",yes:"4.1 F-B",no:"4.2 B"},
  {code:"4.2 B",sphere:"ambiental",category:"Criação de animais",title:"Questões agropecuárias",question:"A atividade é passível de licença ambiental?",yes:"4.3 B",no:"4.2 F-B"},
  {code:"4.3 B",sphere:"ambiental",category:"Criação de animais",title:"Questões agropecuárias",question:"A atividade é de competência da União?",yes:"4.3 F-B",no:"4.4 B"},
  {code:"4.4 B",sphere:"ambiental",category:"Criação de animais",title:"Questões agropecuárias",question:"A atividade produz impacto regional dentro do mesmo estado?",yes:"4.4 F-B",no:"4.5 B"},
  {code:"4.5 B",sphere:"ambiental",category:"Criação de animais",title:"Questões agropecuárias",question:"O município possui órgão ambiental competente para licenciamento?",yes:"4.5 F-B",no:"4.4 F-B"},
  {code:"5 B",sphere:"ambiental",category:"Desmatamento",title:"Desmatamento",question:"Há desmatamento em margem de rio ou reservatório?",yes:"5 F-B",no:"5.1 B"},
  {code:"5.1 B",sphere:"ambiental",category:"Desmatamento",title:"Desmatamento",question:"A remoção de vegetação é passível de licença ambiental?",yes:"5.2 B",no:"5.1 F-B"},
  {code:"5.2 B",sphere:"ambiental",category:"Desmatamento",title:"Desmatamento",question:"A atividade é de competência da União?",yes:"5.2 F-B",no:"5.3 B"},
  {code:"5.3 B",sphere:"ambiental",category:"Desmatamento",title:"Desmatamento",question:"A atividade produz impacto regional dentro do mesmo estado?",yes:"5.3 F-B",no:"5.4 B"},
  {code:"5.4 B",sphere:"ambiental",category:"Desmatamento",title:"Desmatamento",question:"O município possui órgão ambiental competente para licenciamento?",yes:"5.4 F-B",no:"5.3 F-B"},
  {code:"6 B",sphere:"ambiental",category:"Mineração",title:"Mineração",question:"Há extração mineral em margem de rio ou reservatório?",yes:"6 F-B",no:"6.1 B"},
  {code:"6.1 B",sphere:"ambiental",category:"Mineração",title:"Mineração",question:"A mineração é passível de licença ambiental?",yes:"6.2 B",no:"END"},
  {code:"6.2 B",sphere:"ambiental",category:"Mineração",title:"Mineração",question:"A atividade é de competência da União?",yes:"6.2 F-B",no:"6.3 B"},
  {code:"6.3 B",sphere:"ambiental",category:"Mineração",title:"Mineração",question:"A atividade produz impacto regional dentro do mesmo estado?",yes:"6.3 F-B",no:"6.4 B"},
  {code:"6.4 B",sphere:"ambiental",category:"Mineração",title:"Mineração",question:"O município possui órgão ambiental competente para licenciamento?",yes:"6.4 F-B",no:"6.3 F-B"},
  {code:"7 B",sphere:"ambiental",category:"Construção civil",title:"Construção civil",question:"Há construção em área marginal de rio ou reservatório?",yes:"7 F-B",no:"7.1 B"},
  {code:"7.1 B",sphere:"ambiental",category:"Construção civil",title:"Construção civil",question:"Há construção considerada irregular em Unidade de Conservação?",yes:"7.1 F-B",no:"7.2 B"},
  {code:"7.2 B",sphere:"ambiental",category:"Construção civil",title:"Construção civil",question:"Há construção considerada irregular em área de risco?",yes:"7.2 F-B",no:"END"},
];

export const cards: Record<string,Card> = Object.fromEntries([...H,...B].map(c=>[c.code,c]));

const federal="Encaminhe ao órgão ambiental federal competente, em regra o Ibama, sem prejuízo de outros órgãos federais com atribuição específica.";
const estadual="Encaminhe ao órgão ambiental estadual competente. No Ceará, a atribuição é exercida pela Semace quando a atividade estiver sujeita ao controle estadual.";
const municipal="Encaminhe ao órgão ambiental municipal, quando houver estrutura licenciadora própria e o impacto estiver restrito ao interesse local.";
const water="Acione a SRH/Cogerh para verificar outorga, regularidade do uso, alocação e necessidade de fiscalização. Havendo prejuízo coletivo, avalie também o Ministério Público.";
const finals: FinalCard[] = [
  {code:"1.1 F-A",sphere:"hidrica",title:"Impedimento físico e cobrança",body:"Apure a possível cobrança indevida e a regularidade do impedimento junto à Cogerh/SRH, considerando também o direito coletivo de acesso."},
  {code:"2 F-A",sphere:"hidrica",title:"Origem e legalidade da cobrança",body:"Verifique fundamento, critérios, usuários abrangidos, outorga e participação das instâncias colegiadas. No Caso 1, considere IAT, Comitês de Bacia, Conselho Estadual e TCE-PR."},
  {code:"3.2 F-A",sphere:"hidrica",title:"Barragem em licenciamento",body:"Participe das audiências públicas e formalize questionamentos e reivindicações no processo de licenciamento."},
  {code:"3.3 F-A",sphere:"hidrica",title:"Barragem possivelmente irregular",body:"Formalize denúncia à SRH/Cogerh para apuração de outorga, licença ambiental e segurança da estrutura."},
  {code:"3.4 F-A",sphere:"hidrica",title:"Barragem cadastrada",body:"Leve demandas de segurança, operação ou manutenção à SRH/Cogerh e ao órgão responsável pela fiscalização."},
  {code:"3.5 F-A",sphere:"hidrica",title:"Barragem não cadastrada",body:"Encaminhe à SRH/Cogerh para fiscalização técnica, regularização e providências de segurança."},
  {code:"4.2 F-A",sphere:"hidrica",title:"Captação acima do autorizado",body:water},{code:"4.3 F-A",sphere:"hidrica",title:"Retirada em adutora",body:"Em água bruta, acione Cogerh/SRH; em água tratada, comunique imediatamente a companhia ou o operador responsável."},
  {code:"5.1 F-A",sphere:"hidrica",title:"Exploração subterrânea planejada",body:"Consulte SRH/Cogerh antes da captação e verifique pedido de outorga, autorização de obra e regularidade do poço."},
  {code:"5.2 F-A",sphere:"hidrica",title:"Captação subterrânea irregular",body:"Acione SRH/Cogerh para conferir a outorga e fiscalizar eventual retirada acima da vazão autorizada."},
  {code:"6 F-A",sphere:"hidrica",title:"Prioridade de uso",body:water},{code:"6.1 F-A",sphere:"hidrica",title:"Transferência ou impacto entre bacias",body:water},{code:"6.3 F-A",sphere:"hidrica",title:"Uso irregular na bacia",body:water},
  {code:"7.1 F-A",sphere:"hidrica",title:"Articulação institucional",body:"Verifique as atribuições legais e leve a controvérsia às instâncias participativas adequadas, incluindo comitês e conselho de recursos hídricos."},
  {code:"1 F-B",sphere:"ambiental",title:"Efluente em área protegida",body:"Comunique o órgão ambiental competente e a gestão de recursos hídricos; havendo dano coletivo, avalie o Ministério Público."},
  {code:"1.2 F-B",sphere:"ambiental",title:"Lançamento sem outorga",body:"Comunique Cogerh/SRH e o órgão ambiental competente para apuração da ausência de outorga e possível infração ambiental."},
  {code:"1.3 F-B",sphere:"ambiental",title:"Atividade não sujeita a licença",body:"Reavalie o enquadramento ambiental e encerre este motivo quando a atividade não estiver sujeita ao licenciamento aplicável."},
  {code:"1.4 F-B",sphere:"ambiental",title:"Competência federal",body:federal},{code:"1.5 F-B",sphere:"ambiental",title:"Competência estadual",body:estadual},{code:"1.6 F-B",sphere:"ambiental",title:"Competência municipal",body:municipal},
  {code:"2 F-B",sphere:"ambiental",title:"Resíduos em corpo hídrico",body:"Comunique o órgão ambiental competente e Cogerh/SRH quando houver risco à qualidade da água; avalie o Ministério Público em caso de dano coletivo."},
  {code:"2.1 F-B",sphere:"ambiental",title:"Descarte irregular fora do corpo hídrico",body:"Encaminhe ao órgão ambiental competente e, em flagrante, ao Batalhão de Polícia de Meio Ambiente."},
  {code:"3.1 F-B",sphere:"ambiental",title:"Agricultura em margem protegida",body:"Comunique o órgão ambiental competente para verificar APP, licenciamento e eventual dano à qualidade da água."},
  {code:"3.2 F-B",sphere:"ambiental",title:"Atividade agrícola não licenciável",body:"Reavalie o enquadramento e verifique outras possíveis infrações ambientais antes de encerrar o caminho."},
  {code:"3.3 F-B",sphere:"ambiental",title:"Competência federal",body:federal},{code:"3.4 F-B",sphere:"ambiental",title:"Competência estadual",body:estadual},{code:"3.5 F-B",sphere:"ambiental",title:"Competência municipal",body:municipal},
  {code:"4.1 F-B",sphere:"ambiental",title:"Criação de animais em margem protegida",body:"Comunique o órgão ambiental competente para verificar APP, licenciamento e impacto sobre a qualidade da água."},
  {code:"4.2 F-B",sphere:"ambiental",title:"Atividade pecuária não licenciável",body:"Reavalie o enquadramento e outras possíveis infrações antes de encerrar o caminho."},
  {code:"4.3 F-B",sphere:"ambiental",title:"Competência federal",body:federal},{code:"4.4 F-B",sphere:"ambiental",title:"Competência estadual",body:estadual},{code:"4.5 F-B",sphere:"ambiental",title:"Competência municipal",body:municipal},
  {code:"5 F-B",sphere:"ambiental",title:"Desmatamento em margem protegida",body:"Comunique o órgão ambiental competente e verifique autorização para supressão, intervenção em APP e reparação do dano."},
  {code:"5.1 F-B",sphere:"ambiental",title:"Supressão não licenciável",body:"Reavalie o enquadramento e verifique se há autorização específica para intervenção ou supressão de vegetação."},
  {code:"5.2 F-B",sphere:"ambiental",title:"Competência federal",body:federal},{code:"5.3 F-B",sphere:"ambiental",title:"Competência estadual",body:estadual},{code:"5.4 F-B",sphere:"ambiental",title:"Competência municipal",body:municipal},
  {code:"6 F-B",sphere:"ambiental",title:"Mineração em margem de rio",body:"Consulte órgão ambiental, SRH/Cogerh e Agência Nacional de Mineração; denuncie atividade sem licença ou fora da área autorizada."},
  {code:"6.2 F-B",sphere:"ambiental",title:"Competência federal",body:federal},{code:"6.3 F-B",sphere:"ambiental",title:"Competência estadual",body:estadual},{code:"6.4 F-B",sphere:"ambiental",title:"Competência municipal",body:municipal},
  {code:"7 F-B",sphere:"ambiental",title:"Construção em margem protegida",body:"Consulte órgão ambiental e urbanístico para verificar APP, licenciamento, alvará e autorização de intervenção."},
  {code:"7.1 F-B",sphere:"ambiental",title:"Construção em Unidade de Conservação",body:"Identifique a esfera da unidade e consulte ICMBio, Sema ou órgão municipal, além do responsável pelo licenciamento."},
  {code:"7.2 F-B",sphere:"ambiental",title:"Construção em área de risco",body:"Comunique a Defesa Civil Municipal e os órgãos urbanístico e ambiental competentes para vistoria e providências."},
];
// The displayed final-card text is extracted verbatim from CONFLOW - F.pdf.
export const finalCards = rawFinalCards as unknown as Record<string,FinalCard>;
