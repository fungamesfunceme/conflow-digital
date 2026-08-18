import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import { cards, categories, finalCards, type Sphere, type Card, type FinalCard } from "./conflow-data";
import caseData from "./cases.json";

type Answer="SIM"|"NÃO";
type HistoryItem={card:Card;answer:Answer;reason:string;destination:string};
type ConflictCase={id:number;title:string;body:string;links:{label:string;url:string}[]};
const allCases=caseData as ConflictCase[];
const caseTitle=(item:ConflictCase)=>item.id===9?"Despejo irregular de efluentes no Rio Monte Alegre — Chapecó, SC":item.title;

export default function App(){
  const [selectedCase,setSelectedCase]=useState<ConflictCase|null>(null);
  const [sphere,setSphere]=useState<Sphere|null>(null);
  const [current,setCurrent]=useState<Card|null>(null);
  const [history,setHistory]=useState<HistoryItem[]>([]);
  const [reason,setReason]=useState("");
  const [final,setFinal]=useState<FinalCard|null>(null);
  const [ended,setEnded]=useState(false);
  const [showCase,setShowCase]=useState(true);
  const flowRef=useRef<HTMLElement|null>(null);
  const pathCards=[...history.map(item=>item.card),...(current?[current]:[])];

  const resetAnswer=()=>{setReason("")};
  const chooseSphere=(s:Sphere)=>{setSphere(s);setCurrent(null);setHistory([]);setFinal(null);setEnded(false);resetAnswer()};
  const chooseCard=(code:string)=>{setCurrent(cards[code]);setHistory([]);setFinal(null);setEnded(false);resetAnswer()};
  const restart=()=>{setSphere(null);setCurrent(null);setHistory([]);setFinal(null);setEnded(false);resetAnswer();setShowCase(true)};
  const chooseCase=(item:ConflictCase)=>{setSelectedCase(item);restart()};
  const changeCase=()=>{restart();setSelectedCase(null)};
  const returnToTypes=()=>{setCurrent(null);setHistory([]);setFinal(null);setEnded(false);resetAnswer()};
  const advance=(chosen:Answer)=>{
    if(!current)return;
    const destination=chosen==="SIM"?current.yes:current.no;
    setHistory(h=>[...h,{card:current,answer:chosen,reason,destination}]);
    resetAnswer();
    if(destination==="END"){setCurrent(null);setEnded(true);return}
    if(finalCards[destination]){setCurrent(null);setFinal(finalCards[destination]);return}
    setCurrent(cards[destination]);
  };
  const downloadFlow=async()=>{
    if(!flowRef.current)return;
    try{
      const dataUrl=await toPng(flowRef.current,{cacheBust:true,pixelRatio:2,backgroundColor:"#eaf3f5"});
      const link=document.createElement("a");
      link.download=`conflow-fluxo-caso-${selectedCase?.id??"atividade"}.png`;
      link.href=dataUrl;
      link.click();
    }catch(error){
      console.error("Erro ao gerar imagem do fluxo",error);
    }
  };

  return <main>
    <style>{`
      .flow{max-width:760px!important;margin:32px auto 0!important;display:flex!important;flex-direction:column!important;align-items:stretch!important;overflow:visible!important;padding-bottom:0!important}
      .flowPiece{display:flex!important;flex-direction:column!important;align-items:stretch!important;width:100%!important}
      .flowNode{width:100%!important;min-height:120px!important}
      .connector{width:100%!important;height:64px!important;position:relative!important;display:grid!important;place-items:center!important}
      .connector i{width:1px!important;height:auto!important;position:absolute!important;left:50%!important;right:auto!important;top:8px!important;bottom:8px!important;background:#78928a!important}
      .connector i:after{content:""!important;position:absolute!important;left:-4px!important;right:auto!important;top:auto!important;bottom:0!important;border-left:4px solid transparent!important;border-right:4px solid transparent!important;border-top:7px solid #78928a!important;border-bottom:0!important}
      .connector span{background:#eaf3f5!important;z-index:1!important;padding:4px 8px!important}
      @media(max-width:850px){.flow{max-width:100%!important}.flowNode{min-height:108px!important}}
    `}</style>
    <header className="topbar"><a className="brand" href="#top"><img className="brandLogo" src={`${import.meta.env.BASE_URL}conflow-logo.png`} alt="Conflow"/><span><small>Caminhos para gestão de conflitos de água</small></span></a><div className="caseTag">{selectedCase?`CASO ${selectedCase.id}`:`${allCases.length} CASOS`}</div></header>
    <section className="hero" id="top"><div><p className="kicker">OFICINA INTERATIVA</p><h1>{selectedCase?<>Classifique o conflito.<br/><em>Construa o caminho.</em></>:<>Escolha um caso.<br/><em>Comece a investigação.</em></>}</h1><p className="lede">{selectedCase?"Escolha a esfera, selecione uma tipologia e percorra todas as cartas até o direcionamento final.":"Doze conflitos reais para explorar caminhos de gestão hídrica e ambiental."}</p></div><div className="river" aria-hidden="true"><i/><i/><i/></div></section>
    <section className="workspace">
      <aside className="casePanel">{selectedCase?<><button className="caseToggle" onClick={()=>setShowCase(!showCase)} aria-expanded={showCase}><span>{String(selectedCase.id).padStart(2,"0")}</span> O caso <b>{showCase?"−":"+"}</b></button>{showCase&&<div className="caseBody"><h2>{caseTitle(selectedCase)}</h2><p>{selectedCase.body}</p><h3>Evidências e links de acesso</h3><ul className="sourceLinks">{selectedCase.links.map((link,index)=><li key={index}><a href={link.url} target="_blank" rel="noreferrer">{link.label} ↗</a></li>)}</ul><button className="changeCase" onClick={changeCase}>Trocar de caso</button></div>}</>:<div className="caseBody emptyCase"><span>12</span><h2>Casos disponíveis</h2><p>Escolha um conflito ao lado para iniciar a atividade.</p></div>}</aside>
      <div className="gamePanel">
        {!selectedCase&&<section className="caseLibrary"><div className="stepLabel">ETAPA 1 · ESCOLHA O CASO</div><h2>Qual conflito o grupo irá analisar?</h2><div className="caseGrid">{allCases.map(item=><button key={item.id} onClick={()=>chooseCase(item)}><span>{String(item.id).padStart(2,"0")}</span><strong>{caseTitle(item)}</strong><b>Selecionar caso →</b></button>)}</div></section>}
        {selectedCase&&!sphere&&<section className="chooseCard"><div className="stepLabel">ETAPA 2 · ESCOLHA A ESFERA</div><h2>Em qual esfera o conflito deve ser investigado?</h2><p>A classificação deve acontecer antes da escolha da tipologia.</p><div className="sphereChoices"><button className="sphereCard blue" onClick={()=>chooseSphere("hidrica")}><span>A</span><small>ESFERA</small><strong>Gestão hídrica</strong><p>Acesso, quantidade, cobrança, alocação e governança</p><b>ESCOLHER →</b></button><button className="sphereCard green" onClick={()=>chooseSphere("ambiental")}><span>B</span><small>ESFERA</small><strong>Gestão ambiental</strong><p>Qualidade da água, atividades e impactos ambientais</p><b>ESCOLHER →</b></button></div></section>}
        {sphere&&!current&&!final&&!ended&&history.length===0&&<section className="chooseCard"><div className="stageNav"><button className="back" onClick={restart}>← Voltar à esfera</button><span>ETAPA 2 · ESCOLHA O CONFLITO</span></div><h2>Qual é o possível motivo conflitante?</h2><p>Compare todas as tipologias com as informações do caso.</p><div className={`conflictGrid ${sphere}`}>{categories[sphere].map(([code,name])=><button key={code} className="conflictOption" onClick={()=>chooseCard(code)}><span>{code}</span><strong>{name}</strong><b>Selecionar →</b></button>)}</div></section>}
        {current&&<section className="decision" aria-live="polite"><div className="decisionHead"><button className="back" onClick={returnToTypes}>← Recomeçar pela tipologia</button><span>CARTA {history.length+1} DO PERCURSO</span></div><article className={`questionCard ${sphere==="hidrica"?"blue":"teal"}`}><div className="questionMeta"><span>{current.code}</span><small>{current.title}</small></div><h2>{current.question}</h2>{current.note&&<p><b>Antes de responder:</b> {current.note}</p>}</article><label className="reasonBox"><span>JUSTIFICATIVA DESTA DECISÃO <small>opcional</small></span><textarea value={reason} onChange={e=>setReason(e.target.value)} placeholder="Que informação do caso sustenta a resposta?"/></label><div className="directAnswers"><button className="yes" onClick={()=>advance("SIM")}><strong>SIM</strong><span>Próximo fluxo →</span></button><button className="no" onClick={()=>advance("NÃO")}><strong>NÃO</strong><span>Próximo fluxo →</span></button></div></section>}
        {final&&<section className="completion"><div className="stepLabel">PERCURSO CONCLUÍDO</div><article className="resultCard final"><div><span className="resultCode">{final.code}</span><small>DIRECIONAMENTO FINAL</small></div><h2>{final.title}</h2><p>{final.body}</p><div className="notice"><b>Leitura do Conflow</b><span>A carta orienta a discussão; não substitui análise jurídica ou manifestação do órgão competente.</span></div></article><div className="completionActions"><button onClick={returnToTypes}>Testar outra tipologia</button><button onClick={downloadFlow}>Baixar fluxo</button><button onClick={restart}>Reiniciar tudo</button></div></section>}
        {ended&&<section className="completion"><div className="stepLabel">FIM DESTE CAMINHO</div><article className="resultCard review"><div><span className="resultCode">Este não é um motivo conflitante</span></div><p>As respostas indicam que, para as informações apresentadas, o percurso pode ser encerrado sem a identificação de um motivo conflitante.</p></article><div className="completionActions"><button onClick={returnToTypes}>Testar outra tipologia</button><button onClick={downloadFlow}>Baixar fluxo</button><button onClick={restart}>Trocar a esfera</button></div></section>}
      </div>
    </section>
    {selectedCase&&<section className="flowSection" ref={flowRef}><div className="flowHead"><div><span>SEU PERCURSO</span><h2>Fluxo construído</h2></div><button onClick={restart}>Reiniciar atividade</button></div><div className="flow"><div className="flowNode caseNode"><span>CASO {selectedCase.id}</span><strong>{caseTitle(selectedCase)}</strong></div>{sphere&&<><div className="connector"><i/><span>ESFERA</span></div><div className="flowNode"><span>{sphere==="hidrica"?"A":"B"}</span><strong>{sphere==="hidrica"?"Gestão hídrica":"Gestão ambiental"}</strong></div></>}{pathCards.map((card,index)=><div className="flowPiece" key={`${card.code}-${index}`}><div className="connector"><i/><span className={index>0?(history[index-1]?.answer==="SIM"?"sim":"nao"):""}>{index===0?"MOTIVO":history[index-1]?.answer}</span></div><div className={`flowNode ${current?.code===card.code?"currentNode":""}`}><span>{card.code}</span><strong>{index===0?card.title:card.question}</strong></div></div>)}{final&&<><div className="connector"><i/><span className={history.at(-1)?.answer==="SIM"?"sim":"nao"}>{history.at(-1)?.answer}</span></div><div className="flowNode endNode"><span>{final.code}</span><strong>{final.title}</strong></div></>}{ended&&<><div className="connector"><i/><span className={history.at(-1)?.answer==="SIM"?"sim":"nao"}>{history.at(-1)?.answer}</span></div><div className="flowNode endNode"><span>FIM</span><strong>Não é motivo conflitante</strong></div></>}</div>{history.filter(h=>h.reason).map((h,i)=><blockquote key={i}><span>{h.card.code} · RESPOSTA {h.answer}</span>“{h.reason}”</blockquote>)}</section>}
    <footer><span>CONFLOW DIGITAL</span><button onClick={restart}>Começar novamente ↑</button></footer>
  </main>
}
