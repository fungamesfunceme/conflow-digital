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
  const [welcome,setWelcome]=useState(true);
  const [selectedCase,setSelectedCase]=useState<ConflictCase|null>(null);
  const [sphere,setSphere]=useState<Sphere|null>(null);
  const [current,setCurrent]=useState<Card|null>(null);
  const [history,setHistory]=useState<HistoryItem[]>([]);
  const [reason,setReason]=useState("");
  const [final,setFinal]=useState<FinalCard|null>(null);
  const [ended,setEnded]=useState(false);
  const [showCase,setShowCase]=useState(true);
  const flowRef=useRef<HTMLDivElement|null>(null);
  const pathCards=[...history.map(item=>item.card),...(current?[current]:[])];

  const resetAnswer=()=>{setReason("")};
  const chooseSphere=(s:Sphere)=>{setSphere(s);setCurrent(null);setHistory([]);setFinal(null);setEnded(false);resetAnswer()};
  const chooseCard=(code:string)=>{setCurrent(cards[code]);setHistory([]);setFinal(null);setEnded(false);resetAnswer()};
  const restart=()=>{setSphere(null);setCurrent(null);setHistory([]);setFinal(null);setEnded(false);resetAnswer();setShowCase(true)};
  const chooseCase=(item:ConflictCase)=>{setSelectedCase(item);restart()};
  const changeCase=()=>{restart();setSelectedCase(null)};
  const returnToTypes=()=>{setCurrent(null);setHistory([]);setFinal(null);setEnded(false);resetAnswer()};
  const startActivity=()=>{setWelcome(false);setSelectedCase(null);restart();requestAnimationFrame(()=>window.scrollTo({top:0,behavior:"smooth"}))};
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
      .flowTitleActions{display:flex;align-items:center;gap:12px;margin-top:12px}
      .flowTitleActions .downloadFlow{border:1px solid #17345f;background:#17345f;color:white;text-decoration:none;padding:10px 14px;font-size:12px;font-weight:800}
      .flowCapture{padding:1px 0 0}

      .welcomeHero{min-height:620px;background:#102a2a;color:#fffaf1;padding:82px clamp(24px,7vw,110px);display:grid;grid-template-columns:minmax(0,1.15fr) minmax(280px,.85fr);align-items:center;gap:70px;overflow:hidden}
      .welcomeHeroCopy{max-width:820px}
      .welcomeEyebrow{margin:0 0 18px;color:#73cfe2;font-size:12px;font-weight:900;letter-spacing:.18em}
      .welcomeHero h1{font-family:Georgia,serif;font-size:clamp(52px,7vw,92px);line-height:.94;letter-spacing:-.045em;font-weight:500;margin:0 0 28px}
      .welcomeHero h1 em{color:#f0b34d;font-style:normal;font-weight:500}
      .welcomeIntro{max-width:720px;font-size:19px;line-height:1.65;color:#cfdbd8;margin:0}
      .welcomeActions{display:flex;flex-wrap:wrap;gap:12px;margin-top:34px}
      .welcomePrimary,.welcomeSecondary{min-height:50px;padding:14px 22px;font-weight:900;font-size:12px;letter-spacing:.07em;text-decoration:none;border:1px solid}
      .welcomePrimary{background:#f0b34d;border-color:#f0b34d;color:#102a2a}
      .welcomeSecondary{background:transparent;border-color:#8da6a0;color:#fffaf1}
      .welcomeVisual{position:relative;min-height:390px;display:grid;place-items:center}
      .welcomeVisual img{width:min(310px,70%);height:auto;position:relative;z-index:2;filter:drop-shadow(0 24px 32px #0005)}
      .welcomeRiver{position:absolute;inset:0;transform:rotate(-8deg);opacity:.85}
      .welcomeRiver i{position:absolute;left:2%;right:-22%;height:40px;border-radius:50%;border-top:7px solid}
      .welcomeRiver i:nth-child(1){top:18%;color:#e5a444}.welcomeRiver i:nth-child(2){top:44%;left:15%;color:#2bbbd3}.welcomeRiver i:nth-child(3){top:70%;left:28%;color:#7e9f41}

      .welcomeSection{padding:76px clamp(24px,7vw,110px)}
      .welcomeSectionInner{max-width:1240px;margin:0 auto}
      .welcomeSectionLabel{font-size:10px;font-weight:900;letter-spacing:.16em;color:#12766b;text-transform:uppercase}
      .welcomeSection h2{font-family:Georgia,serif;font-size:clamp(36px,5vw,58px);line-height:1.04;font-weight:500;letter-spacing:-.025em;margin:12px 0 26px;color:#102a2a}
      .welcomeSection p{font-size:17px;line-height:1.7;color:#445b58}
      .welcomeAbout{background:#f4f0e7}
      .welcomeAboutGrid{display:grid;grid-template-columns:1fr 1fr;gap:70px;align-items:start}
      .welcomeAboutText{max-width:650px}
      .welcomeQuote{background:#fff2a0;padding:38px 40px;border-top:6px solid #e39a36}
      .welcomeQuote strong{display:block;font-family:Georgia,serif;font-size:30px;line-height:1.12;color:#102a2a;margin-bottom:18px}
      .welcomeQuote p{margin:0;color:#263f3c}

      .welcomeAudience{background:#dfeaf6}
      .audienceGrid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px;margin-top:28px}
      .audienceCard{background:#fff;padding:26px 22px;min-height:132px;border-top:4px solid #126aa3;display:flex;align-items:flex-end}
      .audienceCard strong{font-family:Georgia,serif;font-size:21px;line-height:1.12;color:#17345f}

      .welcomeSteps{background:#fffdf6}
      .stepsGrid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:34px}
      .stepCard{padding:30px;min-height:300px;display:flex;flex-direction:column;border-top:6px solid}
      .stepCard:nth-child(1){background:#e7f1fb;border-color:#126aa3}.stepCard:nth-child(2){background:#edf4df;border-color:#6d951b}.stepCard:nth-child(3){background:#fff1c9;border-color:#e39a36}
      .stepNumber{font-size:54px;font-weight:900;letter-spacing:-.05em;line-height:1;color:#17345f}
      .stepCard h3{font-family:Georgia,serif;font-size:28px;line-height:1.08;margin:28px 0 14px;color:#102a2a}
      .stepCard p{font-size:15px;line-height:1.6;margin:0}

      .welcomeCta{padding:72px clamp(24px,7vw,110px);background:#102a2a;color:#fff;display:flex;align-items:center;justify-content:space-between;gap:40px}
      .welcomeCta>div{max-width:760px}
      .welcomeCta span{font-size:10px;font-weight:900;letter-spacing:.16em;color:#73cfe2}
      .welcomeCta h2{font-family:Georgia,serif;font-size:clamp(34px,4.5vw,56px);line-height:1.04;font-weight:500;margin:10px 0 0}
      .welcomeCta button{border:0;background:#f0b34d;color:#102a2a;padding:17px 24px;font-size:12px;font-weight:900;letter-spacing:.08em;white-space:nowrap}

      @media(max-width:900px){
        .welcomeHero{grid-template-columns:1fr;min-height:auto}.welcomeVisual{min-height:300px}.welcomeVisual img{width:min(260px,55%)}
        .welcomeAboutGrid{grid-template-columns:1fr;gap:32px}.audienceGrid{grid-template-columns:repeat(2,minmax(0,1fr))}.stepsGrid{grid-template-columns:1fr}.stepCard{min-height:0}.welcomeCta{align-items:flex-start;flex-direction:column}
      }
      @media(max-width:520px){
        .welcomeHero{padding-block:56px}.welcomeHero h1{font-size:48px}.welcomeIntro{font-size:17px}.welcomeVisual{min-height:220px}.welcomeSection{padding-block:54px}.welcomeQuote{padding:28px 24px}.welcomeQuote strong{font-size:26px}.audienceGrid{grid-template-columns:1fr}.welcomeActions{display:grid}.welcomePrimary,.welcomeSecondary{text-align:center}
      }
      @media(max-width:850px){.flow{max-width:100%!important}.flowNode{min-height:108px!important}.flowTitleActions{flex-wrap:wrap}}
    `}</style>
    <header className="topbar"><a className="brand" href="#top"><img className="brandLogo" src={`${import.meta.env.BASE_URL}conflow-logo.png`} alt="Conflow"/><span><small>Caminhos para gestão de conflitos de água</small></span></a><div className="caseTag">{selectedCase?`CASO ${selectedCase.id}`:`${allCases.length} CASOS`}</div></header>

    {welcome?<>
      <section className="welcomeHero" id="top">
        <div className="welcomeHeroCopy">
          <p className="welcomeEyebrow">OFICINA INTERATIVA</p>
          <h1>Caminhos para Gestão<br/>de <em>Conflitos de Água</em></h1>
          <p className="welcomeIntro">O Conflow simula caminhos para a gestão de conflitos a partir de casos concretos e de fluxos baseados nas atribuições legais dos órgãos competentes, considerando os sistemas de gestão ambiental e de gestão hídrica.</p>
          <div className="welcomeActions"><button className="welcomePrimary" onClick={startActivity}>Começar atividade →</button><a className="welcomeSecondary" href="#como-funciona">Como funciona ↓</a></div>
        </div>
        <div className="welcomeVisual" aria-hidden="true"><div className="welcomeRiver"><i/><i/><i/></div><img src={`${import.meta.env.BASE_URL}conflow-logo.png`} alt=""/></div>
      </section>

      <section className="welcomeSection welcomeAbout">
        <div className="welcomeSectionInner welcomeAboutGrid">
          <div className="welcomeAboutText"><span className="welcomeSectionLabel">Apresentação</span><h2>O conflito também percorre caminhos.</h2><p>O Conflow propõe uma experiência de análise e decisão em que os participantes investigam conflitos reais, identificam a esfera de gestão envolvida e percorrem cartas que orientam possíveis caminhos de gestão.</p></div>
          <div className="welcomeQuote"><strong>Compare o conflito a um rio.</strong><p>Quando tensões hídricas se acumulam sem canais de diálogo, mecanismos de negociação ou vazões de cooperação, a pressão cresce. Diferentemente da água, porém, o conflito pode encontrar outros leitos: comitês de bacia, acordos e formas de governança participativa. Há diferentes caminhos para a gestão de conflitos de água — e o Conflow ajuda a conhecê-los.</p></div>
        </div>
      </section>

      <section className="welcomeSection welcomeAudience">
        <div className="welcomeSectionInner"><span className="welcomeSectionLabel">Público-alvo</span><h2>Para quem é o Conflow?</h2><div className="audienceGrid"><div className="audienceCard"><strong>Membros de Comitês de Bacias Hidrográficas</strong></div><div className="audienceCard"><strong>Gestores de Recursos Hídricos</strong></div><div className="audienceCard"><strong>Estudantes</strong></div><div className="audienceCard"><strong>Profissionais de recursos hídricos e meio ambiente</strong></div></div></div>
      </section>

      <section className="welcomeSection welcomeSteps" id="como-funciona">
        <div className="welcomeSectionInner"><span className="welcomeSectionLabel">Etapas do jogo</span><h2>Três etapas para investigar e construir caminhos.</h2><div className="stepsGrid">
          <article className="stepCard"><span className="stepNumber">01</span><h3>Desconstrução dos conflitos</h3><p>Os participantes recebem casos concretos, analisam gatilhos, atores, duração, escala e arena e indicam uma esfera de gestão: recursos hídricos ou ambiental.</p></article>
          <article className="stepCard"><span className="stepNumber">02</span><h3>Construção dos fluxos</h3><p>As cartas do Conflow orientam o percurso. A escolha da primeira carta está ligada à tipologia do conflito e o grupo constrói um caminho de gestão para o caso analisado.</p></article>
          <article className="stepCard"><span className="stepNumber">03</span><h3>Feedbacks</h3><p>Ao final, os participantes discutem os desfechos, recebem devolutivas sobre o caminho recomendado e avaliam possíveis novos caminhos, o tempo e o material utilizado.</p></article>
        </div></div>
      </section>

      <section className="welcomeCta"><div><span>PRONTO PARA COMEÇAR?</span><h2>Escolha um dos 12 casos e construa o caminho.</h2></div><button onClick={startActivity}>Começar atividade →</button></section>
      <footer><span>CONFLOW DIGITAL</span><button onClick={()=>window.scrollTo({top:0,behavior:"smooth"})}>Voltar ao topo ↑</button></footer>
    </>:<>
      <section className="hero" id="top"><div><p className="kicker">OFICINA INTERATIVA</p><h1>{selectedCase?<>Classifique o conflito.<br/><em>Construa o caminho.</em></>:<>Escolha um caso.<br/><em>Comece a investigação.</em></>}</h1><p className="lede">{selectedCase?"Escolha a esfera, selecione uma tipologia e percorra todas as cartas até o direcionamento final.":"Doze conflitos reais para explorar caminhos de gestão hídrica e ambiental."}</p></div><div className="river" aria-hidden="true"><i/><i/><i/></div></section>
      <section className="workspace">
        <aside className="casePanel">{selectedCase?<><button className="caseToggle" onClick={()=>setShowCase(!showCase)} aria-expanded={showCase}><span>{String(selectedCase.id).padStart(2,"0")}</span> O caso <b>{showCase?"−":"+"}</b></button>{showCase&&<div className="caseBody"><h2>{caseTitle(selectedCase)}</h2><p>{selectedCase.body}</p><h3>Evidências e links de acesso</h3><ul className="sourceLinks">{selectedCase.links.map((link,index)=><li key={index}><a href={link.url} target="_blank" rel="noreferrer">{link.label} ↗</a></li>)}</ul><button className="changeCase" onClick={changeCase}>Trocar de caso</button></div>}</>:<div className="caseBody emptyCase"><span>12</span><h2>Casos disponíveis</h2><p>Escolha um conflito ao lado para iniciar a atividade.</p></div>}</aside>
        <div className="gamePanel">
          {!selectedCase&&<section className="caseLibrary"><div className="stepLabel">ETAPA 1 · ESCOLHA O CASO</div><h2>Qual conflito o grupo irá analisar?</h2><div className="caseGrid">{allCases.map(item=><button key={item.id} onClick={()=>chooseCase(item)}><span>{String(item.id).padStart(2,"0")}</span><strong>{caseTitle(item)}</strong><b>Selecionar caso →</b></button>)}</div></section>}
          {selectedCase&&!sphere&&<section className="chooseCard"><div className="stepLabel">ETAPA 2 · ESCOLHA A ESFERA</div><h2>Em qual esfera o conflito deve ser investigado?</h2><p>A classificação deve acontecer antes da escolha da tipologia.</p><div className="sphereChoices"><button className="sphereCard blue" onClick={()=>chooseSphere("hidrica")}><span>A</span><small>ESFERA</small><strong>Gestão hídrica</strong><p>Acesso, quantidade, cobrança, alocação e governança</p><b>ESCOLHER →</b></button><button className="sphereCard green" onClick={()=>chooseSphere("ambiental")}><span>B</span><small>ESFERA</small><strong>Gestão ambiental</strong><p>Qualidade da água, atividades e impactos ambientais</p><b>ESCOLHER →</b></button></div></section>}
          {sphere&&!current&&!final&&!ended&&history.length===0&&<section className="chooseCard"><div className="stageNav"><button className="back" onClick={restart}>← Voltar à esfera</button><span>ETAPA 2 · ESCOLHA O CONFLITO</span></div><h2>Qual é o possível motivo conflitante?</h2><p>Compare todas as tipologias com as informações do caso.</p><div className={`conflictGrid ${sphere}`}>{categories[sphere].map(([code,name])=><button key={code} className="conflictOption" onClick={()=>chooseCard(code)}><span>{code}</span><strong>{name}</strong><b>Selecionar →</b></button>)}</div></section>}
          {current&&<section className="decision" aria-live="polite"><div className="decisionHead"><button className="back" onClick={returnToTypes}>← Recomeçar pela tipologia</button><span>CARTA {history.length+1} DO PERCURSO</span></div><article className={`questionCard ${sphere==="hidrica"?"blue":"teal"}`}><div className="questionMeta"><span>{current.code}</span><small>{current.title}</small></div><h2>{current.question}</h2>{current.note&&<p><b>Antes de responder:</b> {current.note}</p>}</article><label className="reasonBox"><span>JUSTIFICATIVA DESTA DECISÃO <small>opcional</small></span><textarea value={reason} onChange={e=>setReason(e.target.value)} placeholder="Que informação do caso sustenta a resposta?"/></label><div className="directAnswers"><button className="yes" onClick={()=>advance("SIM")}><strong>SIM</strong><span>Próximo fluxo →</span></button><button className="no" onClick={()=>advance("NÃO")}><strong>NÃO</strong><span>Próximo fluxo →</span></button></div></section>}
          {final&&<section className="completion"><div className="stepLabel">PERCURSO CONCLUÍDO</div><article className="resultCard final"><div><span className="resultCode">{final.code}</span><small>DIRECIONAMENTO FINAL</small></div><h2>{final.title}</h2><p>{final.body}</p><div className="notice"><b>Leitura do Conflow</b><span>A carta orienta a discussão; não substitui análise jurídica ou manifestação do órgão competente.</span></div></article><div className="completionActions"><button onClick={returnToTypes}>Testar outra tipologia</button><button onClick={restart}>Reiniciar tudo</button></div></section>}
          {ended&&<section className="completion"><div className="stepLabel">FIM DESTE CAMINHO</div><article className="resultCard review"><div><span className="resultCode">Este não é um motivo conflitante</span></div><p>As respostas indicam que, para as informações apresentadas, o percurso pode ser encerrado sem a identificação de um motivo conflitante.</p></article><div className="completionActions"><button onClick={returnToTypes}>Testar outra tipologia</button><button onClick={restart}>Trocar a esfera</button></div></section>}
        </div>
      </section>
      {selectedCase&&<section className="flowSection"><div className="flowHead"><div><span>SEU PERCURSO</span><h2>Fluxo construído</h2><div className="flowTitleActions"><button className="downloadFlow" onClick={downloadFlow}>Baixar fluxo ↓</button></div></div><button onClick={restart}>Reiniciar atividade</button></div><div className="flowCapture" ref={flowRef}><div className="flow"><div className="flowNode caseNode"><span>CASO {selectedCase.id}</span><strong>{caseTitle(selectedCase)}</strong></div>{sphere&&<><div className="connector"><i/><span>ESFERA</span></div><div className="flowNode"><span>{sphere==="hidrica"?"A":"B"}</span><strong>{sphere==="hidrica"?"Gestão hídrica":"Gestão ambiental"}</strong></div></>}{pathCards.map((card,index)=><div className="flowPiece" key={`${card.code}-${index}`}><div className="connector"><i/><span className={index>0?(history[index-1]?.answer==="SIM"?"sim":"nao"):""}>{index===0?"MOTIVO":history[index-1]?.answer}</span></div><div className={`flowNode ${current?.code===card.code?"currentNode":""}`}><span>{card.code}</span><strong>{index===0?card.title:card.question}</strong></div></div>)}{final&&<><div className="connector"><i/><span className={history.at(-1)?.answer==="SIM"?"sim":"nao"}>{history.at(-1)?.answer}</span></div><div className="flowNode endNode"><span>{final.code}</span><strong>{final.title}</strong></div></>}{ended&&<><div className="connector"><i/><span className={history.at(-1)?.answer==="SIM"?"sim":"nao"}>{history.at(-1)?.answer}</span></div><div className="flowNode endNode"><span>FIM</span><strong>Não é motivo conflitante</strong></div></>}</div>{history.filter(h=>h.reason).map((h,i)=><blockquote key={i}><span>{h.card.code} · RESPOSTA {h.answer}</span>“{h.reason}”</blockquote>)}</div></section>}
      <footer><span>CONFLOW DIGITAL</span><button onClick={restart}>Começar novamente ↑</button></footer>
    </>}
  </main>
}
