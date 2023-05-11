import{i as I,_ as c,a as w,u as l,W as m,c as o,l as P,d as v,k as C}from"./index.9f2cae52.js";import{C as _,n as f,U as u,b as E,A as b,S as U}from"./normalizeChainId-e4cc0175.browser.esm.1699beec.js";var h=new WeakMap,d=new WeakMap,g=new WeakSet;class S extends _{constructor(t){let{chains:e,options:r}=t;super({chains:e,options:{reloadOnDisconnect:!1,...r}}),I(this,g),c(this,"id","coinbaseWallet"),c(this,"name","Coinbase Wallet"),c(this,"ready",!0),w(this,h,{writable:!0,value:void 0}),w(this,d,{writable:!0,value:void 0}),c(this,"onAccountsChanged",n=>{n.length===0?this.emit("disconnect"):this.emit("change",{account:l.getAddress(n[0])})}),c(this,"onChainChanged",n=>{const i=f(n),s=this.isChainUnsupported(i);this.emit("change",{chain:{id:i,unsupported:s}})}),c(this,"onDisconnect",()=>{this.emit("disconnect")})}async connect(){let{chainId:t}=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};try{const e=await this.getProvider();this.setupListeners(),this.emit("message",{type:"connecting"});const r=await e.enable(),n=l.getAddress(r[0]);let i=await this.getChainId(),s=this.isChainUnsupported(i);if(t&&i!==t)try{i=(await this.switchChain(t)).chainId,s=this.isChainUnsupported(i)}catch(a){console.error(`Connected but failed to switch to desired chain ${t}`,a)}return{account:n,chain:{id:i,unsupported:s},provider:new m(e)}}catch(e){throw/(user closed modal|accounts received is empty)/i.test(e.message)?new u(e):e}}async disconnect(){if(!o(this,d))return;const t=await this.getProvider();t.removeListener("accountsChanged",this.onAccountsChanged),t.removeListener("chainChanged",this.onChainChanged),t.removeListener("disconnect",this.onDisconnect),t.disconnect(),t.close()}async getAccount(){const e=await(await this.getProvider()).request({method:"eth_accounts"});if(e.length===0)throw new Error("No accounts found");return l.getAddress(e[0])}async getChainId(){const t=await this.getProvider();return f(t.chainId)}async getProvider(){var t;if(!o(this,d)){let e=(await P(()=>import("./index.e9ad9d07.js").then(a=>a.i),["assets/index.e9ad9d07.js","assets/index.9f2cae52.js","assets/index.51952beb.css","assets/hooks.module.517650d3.js"])).default;typeof e!="function"&&typeof e.default=="function"&&(e=e.default),v(this,h,new e(this.options));const r=(t=o(this,h).walletExtension)==null?void 0:t.getChainId(),n=this.chains.find(a=>this.options.chainId?a.chainId===this.options.chainId:a.chainId===r)||this.chains[0],i=this.options.chainId||(n==null?void 0:n.chainId),s=this.options.jsonRpcUrl||(n==null?void 0:n.rpc[0]);v(this,d,o(this,h).makeWeb3Provider(s,i))}return o(this,d)}async getSigner(){let{chainId:t}=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};const[e,r]=await Promise.all([this.getProvider(),this.getAccount()]);return new m(e,t).getSigner(r)}async isAuthorized(){try{return!!await this.getAccount()}catch{return!1}}async switchChain(t){var n;const e=await this.getProvider(),r=l.hexValue(t);try{return await e.request({method:"wallet_switchEthereumChain",params:[{chainId:r}]}),(n=this.chains.find(i=>i.chainId===t))!=null?n:{chainId:t,name:`Chain ${r}`,slug:`${r}`,nativeCurrency:{name:"Ether",decimals:18,symbol:"ETH"},rpc:[""],testnet:!1,chain:"ethereum",shortName:"eth"}}catch(i){const s=this.chains.find(a=>a.chainId===t);if(!s)throw new E({chainId:t,connectorId:this.id});if(i.code===4902)try{return await e.request({method:"wallet_addEthereumChain",params:[{chainId:r,chainName:s.name,nativeCurrency:s.nativeCurrency,rpcUrls:s.rpc,blockExplorerUrls:this.getBlockExplorerUrls(s)}]}),s}catch(a){throw C(this,g,y).call(this,a)?new u(a):new b}throw C(this,g,y).call(this,i)?new u(i):new U(i)}}async setupListeners(){const t=await this.getProvider();t.on("accountsChanged",this.onAccountsChanged),t.on("chainChanged",this.onChainChanged),t.on("disconnect",this.onDisconnect)}async getQrUrl(){if(await this.getProvider(),!o(this,h))throw new Error("Coinbase Wallet SDK not initialized");return o(this,h).getQrUrl()}}function y(p){return/(user rejected)/i.test(p.message)}export{S as CoinbaseWalletConnector};
