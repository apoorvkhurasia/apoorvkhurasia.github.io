if(!self.define){let e,i={};const r=(r,f)=>(r=new URL(r+".js",f).href,i[r]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=r,e.onload=i,document.head.appendChild(e)}else e=r,importScripts(r),i()})).then((()=>{let e=i[r];if(!e)throw new Error(`Module ${r} didn’t register its module`);return e})));self.define=(f,t)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(i[n])return;let o={};const d=e=>r(e,n),s={module:{uri:n},exports:o,require:d};i[n]=Promise.all(f.map((e=>s[e]||d(e)))).then((e=>(t(...e),o)))}}define(["./workbox-1c3383c2"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"bundle.js",revision:"17759f2525391f57ab4411ebfdf0ab73"},{url:"bundle.js.LICENSE.txt",revision:"b4aab8fa91cc0786c17c4df54eb71552"},{url:"controller/contentcontroller.d.ts",revision:"7e0277b21a44b0f305ce99776fb86da6"},{url:"controller/fs.d.ts",revision:"36abf44c2392a6ee70898284abd7f288"},{url:"favicon.png",revision:"655f9fee3f3b2ed3a77c6022627203f7"},{url:"index.d.ts",revision:"71a047daab2f310b583791c1eeff73ee"},{url:"index.html",revision:"5c4578543950a45782456db8dd6e8cbf"},{url:"lib/utils.d.ts",revision:"ffbd4009f210d640c5f8a02bd66ff5e1"},{url:"model/model.d.ts",revision:"2acaefac66fb275f91f15868729bfbda"},{url:"view/App.d.ts",revision:"1a67fb3d6f936af09eb985a73b74ce91"},{url:"view/ButtonlessForm.d.ts",revision:"46f55b37e0b4eb7b5d4288207dca1324"},{url:"view/ChapterElement.d.ts",revision:"8dfdde91b88af533367eaa41379d426a"},{url:"view/ContentExplorer.d.ts",revision:"25d25a01fc3efa92fdd28bba29ff8ba6"},{url:"view/ContentViewer.d.ts",revision:"ba5f6c845c4e94ac0cd8474fa01465b5"},{url:"view/TopicElement.d.ts",revision:"e095fc92c5e82f3a55702fb72696a1cb"}],{})}));
//# sourceMappingURL=service-worker.js.map