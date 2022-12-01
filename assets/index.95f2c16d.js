(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const h of o.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&n(h)}).observe(document,{childList:!0,subtree:!0});function e(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerpolicy&&(o.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?o.credentials="include":i.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(i){if(i.ep)return;i.ep=!0;const o=e(i);fetch(i.href,o)}})();const F=["white","black"],m=["pawn","knight","bishop","rook","queen","king"],d=s=>s!==void 0;function it(s){switch(s.toLowerCase()){case"p":return"pawn";case"n":return"knight";case"b":return"bishop";case"r":return"rook";case"q":return"queen";case"k":return"king";default:return}}function rt(s){if(s.length!==2)return;const t=s.charCodeAt(0)-"a".charCodeAt(0),e=s.charCodeAt(1)-"1".charCodeAt(0);if(!(t<0||t>=8||e<0||e>=8))return t+8*e}function Z(s,t){s.prototype=Object.create(t.prototype),s.prototype.constructor=s,G(s,t)}function G(s,t){return G=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,n){return e.__proto__=n,e},G(s,t)}var l,J=function(){function s(){}var t=s.prototype;return t.unwrap=function(e,n){var i=this._chain(function(o){return l.ok(e?e(o):o)},function(o){return n?l.ok(n(o)):l.err(o)});if(i.isErr)throw i.error;return i.value},t.map=function(e,n){return this._chain(function(i){return l.ok(e(i))},function(i){return l.err(n?n(i):i)})},t.chain=function(e,n){return this._chain(e,n||function(i){return l.err(i)})},s}(),ot=function(s){function t(e){var n;return(n=s.call(this)||this).value=void 0,n.isOk=!0,n.isErr=!1,n.value=e,n}return Z(t,s),t.prototype._chain=function(e,n){return e(this.value)},t}(J),ht=function(s){function t(e){var n;return(n=s.call(this)||this).error=void 0,n.isOk=!1,n.isErr=!0,n.error=e,n}return Z(t,s),t.prototype._chain=function(e,n){return n(this.error)},t}(J);(function(s){s.ok=function(t){return new ot(t)},s.err=function(t){return new ht(t||new Error)},s.all=function(t){if(Array.isArray(t)){for(var e=[],n=0;n<t.length;n++){var i=t[n];if(i.isErr)return i;e.push(i.value)}return s.ok(e)}for(var o={},h=Object.keys(t),r=0;r<h.length;r++){var a=t[h[r]];if(a.isErr)return a;o[h[r]]=a.value}return s.ok(o)}})(l||(l={}));const W=s=>(s=s-(s>>>1&1431655765),s=(s&858993459)+(s>>>2&858993459),Math.imul(s+(s>>>4)&252645135,16843009)>>24),M=s=>(s=s>>>8&16711935|(s&16711935)<<8,s>>>16&65535|(s&65535)<<16),K=s=>(s=s>>>1&1431655765|(s&1431655765)<<1,s=s>>>2&858993459|(s&858993459)<<2,s=s>>>4&252645135|(s&252645135)<<4,M(s));class c{constructor(t,e){this.lo=t|0,this.hi=e|0}static fromSquare(t){return t>=32?new c(0,1<<t-32):new c(1<<t,0)}static fromRank(t){return new c(255,0).shl64(8*t)}static fromFile(t){return new c(16843009<<t,16843009<<t)}static empty(){return new c(0,0)}static full(){return new c(4294967295,4294967295)}static corners(){return new c(129,2164260864)}static center(){return new c(402653184,24)}static backranks(){return new c(255,4278190080)}static backrank(t){return t==="white"?new c(255,0):new c(0,4278190080)}static lightSquares(){return new c(1437226410,1437226410)}static darkSquares(){return new c(2857740885,2857740885)}complement(){return new c(~this.lo,~this.hi)}xor(t){return new c(this.lo^t.lo,this.hi^t.hi)}union(t){return new c(this.lo|t.lo,this.hi|t.hi)}intersect(t){return new c(this.lo&t.lo,this.hi&t.hi)}diff(t){return new c(this.lo&~t.lo,this.hi&~t.hi)}intersects(t){return this.intersect(t).nonEmpty()}isDisjoint(t){return this.intersect(t).isEmpty()}supersetOf(t){return t.diff(this).isEmpty()}subsetOf(t){return this.diff(t).isEmpty()}shr64(t){return t>=64?c.empty():t>=32?new c(this.hi>>>t-32,0):t>0?new c(this.lo>>>t^this.hi<<32-t,this.hi>>>t):this}shl64(t){return t>=64?c.empty():t>=32?new c(0,this.lo<<t-32):t>0?new c(this.lo<<t,this.hi<<t^this.lo>>>32-t):this}bswap64(){return new c(M(this.hi),M(this.lo))}rbit64(){return new c(K(this.hi),K(this.lo))}minus64(t){const e=this.lo-t.lo,n=(e&t.lo&1)+(t.lo>>>1)+(e>>>1)>>>31;return new c(e,this.hi-(t.hi+n))}equals(t){return this.lo===t.lo&&this.hi===t.hi}size(){return W(this.lo)+W(this.hi)}isEmpty(){return this.lo===0&&this.hi===0}nonEmpty(){return this.lo!==0||this.hi!==0}has(t){return(t>=32?this.hi&1<<t-32:this.lo&1<<t)!==0}set(t,e){return e?this.with(t):this.without(t)}with(t){return t>=32?new c(this.lo,this.hi|1<<t-32):new c(this.lo|1<<t,this.hi)}without(t){return t>=32?new c(this.lo,this.hi&~(1<<t-32)):new c(this.lo&~(1<<t),this.hi)}toggle(t){return t>=32?new c(this.lo,this.hi^1<<t-32):new c(this.lo^1<<t,this.hi)}last(){if(this.hi!==0)return 63-Math.clz32(this.hi);if(this.lo!==0)return 31-Math.clz32(this.lo)}first(){if(this.lo!==0)return 31-Math.clz32(this.lo&-this.lo);if(this.hi!==0)return 63-Math.clz32(this.hi&-this.hi)}withoutFirst(){return this.lo!==0?new c(this.lo&this.lo-1,this.hi):new c(0,this.hi&this.hi-1)}moreThanOne(){return this.hi!==0&&this.lo!==0||(this.lo&this.lo-1)!==0||(this.hi&this.hi-1)!==0}singleSquare(){return this.moreThanOne()?void 0:this.last()}*[Symbol.iterator](){let t=this.lo,e=this.hi;for(;t!==0;){const n=31-Math.clz32(t&-t);t^=1<<n,yield n}for(;e!==0;){const n=31-Math.clz32(e&-e);e^=1<<n,yield 32+n}}*reversed(){let t=this.lo,e=this.hi;for(;e!==0;){const n=31-Math.clz32(e);e^=1<<n,yield 32+n}for(;t!==0;){const n=31-Math.clz32(t);t^=1<<n,yield n}}}class b{constructor(){}static default(){const t=new b;return t.reset(),t}reset(){this.occupied=new c(65535,4294901760),this.promoted=c.empty(),this.white=new c(65535,0),this.black=new c(0,4294901760),this.pawn=new c(65280,16711680),this.knight=new c(66,1107296256),this.bishop=new c(36,603979776),this.rook=new c(129,2164260864),this.queen=new c(8,134217728),this.king=new c(16,268435456)}static empty(){const t=new b;return t.clear(),t}clear(){this.occupied=c.empty(),this.promoted=c.empty();for(const t of F)this[t]=c.empty();for(const t of m)this[t]=c.empty()}clone(){const t=new b;t.occupied=this.occupied,t.promoted=this.promoted;for(const e of F)t[e]=this[e];for(const e of m)t[e]=this[e];return t}getColor(t){if(this.white.has(t))return"white";if(this.black.has(t))return"black"}getRole(t){for(const e of m)if(this[e].has(t))return e}get(t){const e=this.getColor(t);if(!e)return;const n=this.getRole(t),i=this.promoted.has(t);return{color:e,role:n,promoted:i}}take(t){const e=this.get(t);return e&&(this.occupied=this.occupied.without(t),this[e.color]=this[e.color].without(t),this[e.role]=this[e.role].without(t),e.promoted&&(this.promoted=this.promoted.without(t))),e}set(t,e){const n=this.take(t);return this.occupied=this.occupied.with(t),this[e.color]=this[e.color].with(t),this[e.role]=this[e.role].with(t),e.promoted&&(this.promoted=this.promoted.with(t)),n}has(t){return this.occupied.has(t)}*[Symbol.iterator](){for(const t of this.occupied)yield[t,this.get(t)]}pieces(t,e){return this[t].intersect(this[e])}rooksAndQueens(){return this.rook.union(this.queen)}bishopsAndQueens(){return this.bishop.union(this.queen)}kingOf(t){return this.pieces(t,"king").singleSquare()}}class p{constructor(){}static empty(){const t=new p;for(const e of m)t[e]=0;return t}static fromBoard(t,e){const n=new p;for(const i of m)n[i]=t.pieces(e,i).size();return n}clone(){const t=new p;for(const e of m)t[e]=this[e];return t}equals(t){return m.every(e=>this[e]===t[e])}add(t){const e=new p;for(const n of m)e[n]=this[n]+t[n];return e}nonEmpty(){return m.some(t=>this[t]>0)}isEmpty(){return!this.nonEmpty()}hasPawns(){return this.pawn>0}hasNonPawns(){return this.knight>0||this.bishop>0||this.rook>0||this.queen>0||this.king>0}size(){return this.pawn+this.knight+this.bishop+this.rook+this.queen+this.king}}class k{constructor(t,e){this.white=t,this.black=e}static empty(){return new k(p.empty(),p.empty())}static fromBoard(t){return new k(p.fromBoard(t,"white"),p.fromBoard(t,"black"))}clone(){return new k(this.white.clone(),this.black.clone())}equals(t){return this.white.equals(t.white)&&this.black.equals(t.black)}add(t){return new k(this.white.add(t.white),this.black.add(t.black))}count(t){return this.white[t]+this.black[t]}size(){return this.white.size()+this.black.size()}isEmpty(){return this.white.isEmpty()&&this.black.isEmpty()}nonEmpty(){return!this.isEmpty()}hasPawns(){return this.white.hasPawns()||this.black.hasPawns()}hasNonPawns(){return this.white.hasNonPawns()||this.black.hasNonPawns()}}class x{constructor(t,e){this.white=t,this.black=e}static default(){return new x(3,3)}clone(){return new x(this.white,this.black)}equals(t){return this.white===t.white&&this.black===t.black}}var u;(function(s){s.Fen="ERR_FEN",s.Board="ERR_BOARD",s.Pockets="ERR_POCKETS",s.Turn="ERR_TURN",s.Castling="ERR_CASTLING",s.EpSquare="ERR_EP_SQUARE",s.RemainingChecks="ERR_REMAINING_CHECKS",s.Halfmoves="ERR_HALFMOVES",s.Fullmoves="ERR_FULLMOVES"})(u||(u={}));class f extends Error{}const ct=(s,t,e)=>{let n=s.indexOf(t);for(;e-- >0&&n!==-1;)n=s.indexOf(t,n+t.length);return n},y=s=>/^\d{1,4}$/.test(s)?parseInt(s,10):void 0,X=s=>{const t=it(s);return t&&{role:t,color:s.toLowerCase()===s?"black":"white"}},P=s=>{const t=b.empty();let e=7,n=0;for(let i=0;i<s.length;i++){const o=s[i];if(o==="/"&&n===8)n=0,e--;else{const h=parseInt(o,10);if(h>0)n+=h;else{if(n>=8||e<0)return l.err(new f(u.Board));const r=n+e*8,a=X(o);if(!a)return l.err(new f(u.Board));s[i+1]==="~"&&(a.promoted=!0,i++),t.set(r,a),n++}}}return e!==0||n!==8?l.err(new f(u.Board)):l.ok(t)},Q=s=>{if(s.length>64)return l.err(new f(u.Pockets));const t=k.empty();for(const e of s){const n=X(e);if(!n)return l.err(new f(u.Pockets));t[n.color][n.role]++}return l.ok(t)},lt=(s,t)=>{let e=c.empty();if(t==="-")return l.ok(e);for(const n of t){const i=n.toLowerCase(),o=n===i?"black":"white",h=c.backrank(o).intersect(s[o]);let r;if(i==="q")r=h;else if(i==="k")r=h.reversed();else if("a"<=i&&i<="h")r=c.fromFile(i.charCodeAt(0)-"a".charCodeAt(0)).intersect(h);else return l.err(new f(u.Castling));for(const a of r){if(s.king.has(a))break;if(s.rook.has(a)){e=e.with(a);break}}}return F.some(n=>c.backrank(n).intersect(e).size()>2)?l.err(new f(u.Castling)):l.ok(e)},U=s=>{const t=s.split("+");if(t.length===3&&t[0]===""){const e=y(t[1]),n=y(t[2]);return!d(e)||e>3||!d(n)||n>3?l.err(new f(u.RemainingChecks)):l.ok(new x(3-e,3-n))}else if(t.length===2){const e=y(t[0]),n=y(t[1]);return!d(e)||e>3||!d(n)||n>3?l.err(new f(u.RemainingChecks)):l.ok(new x(e,n))}else return l.err(new f(u.RemainingChecks))},at=s=>{const t=s.split(/[\s_]+/),e=t.shift();let n,i=l.ok(void 0);if(e.endsWith("]")){const r=e.indexOf("[");if(r===-1)return l.err(new f(u.Fen));n=P(e.slice(0,r)),i=Q(e.slice(r+1,-1))}else{const r=ct(e,"/",7);r===-1?n=P(e):(n=P(e.slice(0,r)),i=Q(e.slice(r+1)))}let o;const h=t.shift();if(!d(h)||h==="w")o="white";else if(h==="b")o="black";else return l.err(new f(u.Turn));return n.chain(r=>{const a=t.shift(),E=d(a)?lt(r,a):l.ok(c.empty()),C=t.shift();let O;if(d(C)&&C!=="-"&&(O=rt(C),!d(O)))return l.err(new f(u.EpSquare));let g=t.shift(),R;d(g)&&g.includes("+")&&(R=U(g),g=t.shift());const V=d(g)?y(g):0;if(!d(V))return l.err(new f(u.Halfmoves));const j=t.shift(),H=d(j)?y(j):1;if(!d(H))return l.err(new f(u.Fullmoves));const I=t.shift();let B=l.ok(void 0);if(d(I)){if(d(R))return l.err(new f(u.RemainingChecks));B=U(I)}else d(R)&&(B=R);return t.length>0?l.err(new f(u.Fen)):i.chain(et=>E.chain(nt=>B.map(st=>({board:r,pockets:et,turn:o,unmovedRooks:nt,remainingChecks:st,epSquare:O,halfmoves:V,fullmoves:Math.max(1,H)}))))})},Y=(s=T)=>({headers:s(),moves:new _});class _{constructor(){this.children=[]}*mainline(){let t=this;for(;t.children.length;){const e=t.children[0];yield e.data,t=e}}}class q extends _{constructor(t){super(),this.data=t}}const ut=s=>s?s.winner==="white"?"1-0":s.winner==="black"?"0-1":"1/2-1/2":"*",ft=s=>s==="1-0"?{winner:"white"}:s==="0-1"?{winner:"black"}:s==="1/2-1/2"?{winner:void 0}:void 0,dt=s=>s.replace(/\\/g,"\\\\").replace(/"/g,'\\"'),N=s=>s.replace(/\}/g,""),mt=s=>{const t=[],e=[];if(s.headers.size){for(const[r,a]of s.headers.entries())t.push("[",r,' "',dt(a),`"]
`);t.push(`
`)}for(const r of s.comments||[])e.push("{",N(r),"}");const n=s.headers.get("FEN"),i=n?at(n).unwrap(r=>(r.fullmoves-1)*2+(r.turn==="white"?0:1),r=>0):0,o=[];if(s.moves.children.length){const r=s.moves.children[Symbol.iterator]();o.push({state:0,ply:i,node:r.next().value,sidelines:r,startsVariation:!1,inVariation:!1})}let h=!0;for(;o.length;){const r=o[o.length-1];switch(r.inVariation&&(e.push(")"),r.inVariation=!1,h=!0),r.state){case 0:for(const a of r.node.data.startingComments||[])e.push("{",N(a),"}"),h=!0;(h||r.ply%2===0)&&(e.push(Math.floor(r.ply/2)+1+(r.ply%2?"...":".")),h=!1),e.push(r.node.data.san);for(const a of r.node.data.nags||[])e.push("$"+a),h=!0;for(const a of r.node.data.comments||[])e.push("{",N(a),"}");r.state=1;case 1:{const a=r.sidelines.next();if(a.done){if(r.node.children.length){const E=r.node.children[Symbol.iterator]();o.push({state:0,ply:r.ply+1,node:E.next().value,sidelines:E,startsVariation:!1,inVariation:!1})}r.state=2}else e.push("("),h=!0,o.push({state:0,ply:r.ply,node:a.value,sidelines:[][Symbol.iterator](),startsVariation:!0,inVariation:!1}),r.inVariation=!0;break}case 2:o.pop()}}return e.push(ut(ft(s.headers.get("Result")))),t.push(e.join(" "),`
`),t.join("")},T=()=>new Map([["Event","?"],["Site","?"],["Date","????.??.??"],["Round","?"],["White","?"],["Black","?"],["Result","*"]]),$="\uFEFF",L=s=>/^\s*$/.test(s),A=s=>s.startsWith("%");class pt extends Error{}class wt{constructor(t,e=T,n=1e6){this.emitGame=t,this.initHeaders=e,this.maxBudget=n,this.lineBuf=[],this.resetGame(),this.state=0}resetGame(){this.budget=this.maxBudget,this.found=!1,this.state=1,this.game=Y(this.initHeaders),this.stack=[{parent:this.game.moves,root:!0}],this.commentBuf=[]}consumeBudget(t){if(this.budget-=t,this.budget<0)throw new pt("ERR_PGN_BUDGET")}parse(t,e){if(!(this.budget<0))try{let n=0;for(;;){const i=t.indexOf(`
`,n);if(i===-1)break;const o=i>n&&t[i-1]==="\r"?i-1:i;this.consumeBudget(i-n),this.lineBuf.push(t.slice(n,o)),n=i+1,this.handleLine()}this.consumeBudget(t.length-n),this.lineBuf.push(t.slice(n)),e!=null&&e.stream||(this.handleLine(),this.emit(void 0))}catch(n){this.emit(n)}}handleLine(){let t=!0,e=this.lineBuf.join("");this.lineBuf=[];t:for(;;)switch(this.state){case 0:e.startsWith($)&&(e=e.slice($.length)),this.state=1;case 1:if(L(e)||A(e))return;this.found=!0,this.state=2;case 2:{if(A(e))return;let n=!0;for(;n;)n=!1,e=e.replace(/^\s*\[([A-Za-z0-9][A-Za-z0-9_+#=:-]*)\s+"((?:[^"\\]|\\"|\\\\)*)"\]/,(i,o,h)=>(this.consumeBudget(200),this.game.headers.set(o,h.replace(/\\"/g,'"').replace(/\\\\/g,"\\")),n=!0,t=!1,""));if(L(e))return;this.state=3}case 3:{if(t){if(A(e))return;if(L(e))return this.emit(void 0)}const n=/(?:[NBKRQ]?[a-h]?[1-8]?[-x]?[a-h][1-8](?:=?[nbrqkNBRQK])?|[pnbrqkPNBRQK]?@[a-h][1-8]|O-O-O|0-0-0|O-O|0-0)[+#]?|--|Z0|0000|@@@@|{|;|\$\d{1,4}|[?!]{1,2}|\(|\)|\*|1-0|0-1|1\/2-1\/2/g;let i;for(;i=n.exec(e);){const o=this.stack[this.stack.length-1];let h=i[0];if(h===";")return;if(h.startsWith("$"))this.handleNag(parseInt(h.slice(1),10));else if(h==="!")this.handleNag(1);else if(h==="?")this.handleNag(2);else if(h==="!!")this.handleNag(3);else if(h==="??")this.handleNag(4);else if(h==="!?")this.handleNag(5);else if(h==="?!")this.handleNag(6);else if(h==="1-0"||h==="0-1"||h==="1/2-1/2"||h==="*")this.stack.length===1&&h!=="*"&&this.game.headers.set("Result",h);else if(h==="(")this.consumeBudget(100),this.stack.push({parent:o.parent,root:!1});else if(h===")")this.stack.length>1&&this.stack.pop();else if(h==="{"){const r=n.lastIndex,a=e[r]===" "?r+1:r;e=e.slice(a),this.state=4;continue t}else this.consumeBudget(100),h==="Z0"||h==="0000"||h==="@@@@"?h="--":h.startsWith("0")&&(h=h.replace(/0/g,"O")),o.node&&(o.parent=o.node),o.node=new q({san:h,startingComments:o.startingComments}),o.startingComments=void 0,o.root=!1,o.parent.children.push(o.node)}return}case 4:{const n=e.indexOf("}");if(n===-1){this.commentBuf.push(e);return}else{const i=n>0&&e[n-1]===" "?n-1:n;this.commentBuf.push(e.slice(0,i)),this.handleComment(),e=e.slice(n),this.state=3,t=!1}}}}handleNag(t){var e;this.consumeBudget(50);const n=this.stack[this.stack.length-1];n.node&&((e=n.node.data).nags||(e.nags=[]),n.node.data.nags.push(t))}handleComment(){var t,e;this.consumeBudget(100);const n=this.stack[this.stack.length-1],i=this.commentBuf.join(`
`);this.commentBuf=[],n.node?((t=n.node.data).comments||(t.comments=[]),n.node.data.comments.push(i)):n.root?((e=this.game).comments||(e.comments=[]),this.game.comments.push(i)):(n.startingComments||(n.startingComments=[]),n.startingComments.push(i))}emit(t){if(this.state===4&&this.handleComment(),t)return this.emitGame(this.game,t);this.found&&this.emitGame(this.game,void 0),this.resetGame()}}const gt=(s,t=T)=>{const e=[];return new wt(n=>e.push(n),t,NaN).parse(s),e};let v=document.querySelector("#pgn"),z=document.querySelector("#parse"),w=document.querySelector("#file"),D=document.querySelector("#output");v&&(v.value=`1. e4 e5

1. e4 g5`);const kt=()=>Promise.resolve(v==null?void 0:v.value),yt=()=>{var s;if(((s=w==null?void 0:w.files)==null?void 0:s.length)&&w.files.length>0){const t=w.files.item(0);if(t)return t.text()}return Promise.resolve(void 0)},S=async s=>{let t=await s();if(t){let e=gt(t),n=bt(e);console.log(n);let i=mt(n);console.log(i),D&&(D.value=i)}},bt=s=>{let t=[];for(const n of s)for(const i of tt(n.moves,[]))t.push(i);let e=Y();for(const n of t){let i=e.moves;for(const o of n){let h=i.children.find(r=>r.data.san===o);if(h)i=h;else{let r=new q({san:o});i.children.push(r),i=r}}}return e},tt=(s,t)=>{let e=[];for(const n of s.children){let i=[...t,n.data.san];if(vt(n))e.push(i);else for(const o of tt(n,i))e.push(o)}return e},vt=s=>s.children.length==0;z==null||z.addEventListener("click",()=>S(kt));w==null||w.addEventListener("change",()=>S(yt));
