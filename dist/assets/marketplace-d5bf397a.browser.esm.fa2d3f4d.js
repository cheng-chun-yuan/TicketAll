import{m as i,n as f,N as q,O as W,P as O,Q as T,T as g,S as I,B as o,U as R,V as b,H as l,X as v,Y as F,K as A,Z as M,$ as S,a0 as k,a1 as N,a2 as U,a3 as L,a4 as V,a5 as _,a6 as x,a7 as z,a8 as H,a9 as Y,aa as G,ab as K,ac as $,ad as Q,ae as E,w as D,C as Z,af as X,F as C,A as j,o as J,ag as tt,p as rt,q as et,G as at,v as nt,x as st,y as ot,ah as it}from"./index.88def5d4.js";let m=function(y){return y[y.Direct=0]="Direct",y[y.Auction=1]="Auction",y}({});class ct{constructor(r,e){i(this,"contractWrapper",void 0),i(this,"storage",void 0),i(this,"createListing",f(async t=>{q(t);const n=await W(t.assetContractAddress),a=await W(t.currencyContractAddress);await O(this.contractWrapper,this.getAddress(),n,t.tokenId,await this.contractWrapper.getSignerAddress());const s=await T(this.contractWrapper.getProvider(),t.buyoutPricePerToken,a);let d=Math.floor(t.startTimestamp.getTime()/1e3);const p=(await this.contractWrapper.getProvider().getBlock("latest")).timestamp;return d<p&&(d=p),g.fromContractWrapper({contractWrapper:this.contractWrapper,method:"createListing",args:[{assetContract:n,tokenId:t.tokenId,buyoutPricePerToken:s,currencyToAccept:I(a),listingType:m.Direct,quantityToList:t.quantity,reservePricePerToken:s,secondsUntilEndTime:t.listingDurationInSeconds,startTime:o.from(d)}],parse:h=>({id:this.contractWrapper.parseLogs("ListingAdded",h==null?void 0:h.logs)[0].args.listingId,receipt:h})})})),i(this,"makeOffer",f(async(t,n,a,s,d)=>{if(R(a))throw new Error("You must use the wrapped native token address when making an offer with a native token");const c=await T(this.contractWrapper.getProvider(),s,a);try{await this.getListing(t)}catch(P){throw console.error("Failed to get listing, err =",P),new Error(`Error getting the listing with id ${t}`)}const p=o.from(n),h=o.from(c).mul(p),u=await this.contractWrapper.getCallOverrides()||{};await b(this.contractWrapper,h,a,u);let w=$;return d&&(w=o.from(Math.floor(d.getTime()/1e3))),g.fromContractWrapper({contractWrapper:this.contractWrapper,method:"offer",args:[t,n,a,c,w],overrides:u})})),i(this,"acceptOffer",f(async(t,n)=>{await this.validateListing(o.from(t));const a=await W(n),s=await this.contractWrapper.readContract.offers(t,a);return g.fromContractWrapper({contractWrapper:this.contractWrapper,method:"acceptOffer",args:[t,a,s.currency,s.pricePerToken]})})),i(this,"buyoutListing",f(async(t,n,a)=>{const s=await this.validateListing(o.from(t)),{valid:d,error:c}=await this.isStillValidListing(s,n);if(!d)throw new Error(`Listing ${t} is no longer valid. ${c}`);const p=a||await this.contractWrapper.getSignerAddress(),h=o.from(n),u=o.from(s.buyoutPrice).mul(h),w=await this.contractWrapper.getCallOverrides()||{};return await b(this.contractWrapper,u,s.currencyContractAddress,w),g.fromContractWrapper({contractWrapper:this.contractWrapper,method:"buy",args:[t,p,h,s.currencyContractAddress,u],overrides:w})})),i(this,"updateListing",f(async t=>g.fromContractWrapper({contractWrapper:this.contractWrapper,method:"updateListing",args:[t.id,t.quantity,t.buyoutPrice,t.buyoutPrice,await W(t.currencyContractAddress),t.startTimeInSeconds,t.secondsUntilEnd]}))),i(this,"cancelListing",f(async t=>g.fromContractWrapper({contractWrapper:this.contractWrapper,method:"cancelDirectListing",args:[t]}))),this.contractWrapper=r,this.storage=e}getAddress(){return this.contractWrapper.readContract.address}async getListing(r){const e=await this.contractWrapper.readContract.listings(r);if(e.assetContract===l)throw new v(this.getAddress(),r.toString());if(e.listingType!==m.Direct)throw new F(this.getAddress(),r.toString(),"Auction","Direct");return await this.mapListing(e)}async getActiveOffer(r,e){await this.validateListing(o.from(r)),A(M(e),"Address must be a valid address");const t=await this.contractWrapper.readContract.offers(r,await W(e));if(t.offeror!==l)return await S(this.contractWrapper.getProvider(),o.from(r),t)}async validateListing(r){try{return await this.getListing(r)}catch(e){throw console.error(`Error getting the listing with id ${r}`),e}}async mapListing(r){return{assetContractAddress:r.assetContract,buyoutPrice:o.from(r.buyoutPricePerToken),currencyContractAddress:r.currency,buyoutCurrencyValuePerToken:await k(this.contractWrapper.getProvider(),r.currency,r.buyoutPricePerToken),id:r.listingId.toString(),tokenId:r.tokenId,quantity:r.quantity,startTimeInSeconds:r.startTime,asset:await N(r.assetContract,this.contractWrapper.getProvider(),r.tokenId,this.storage),secondsUntilEnd:r.endTime,sellerAddress:r.tokenOwner,type:m.Direct}}async isStillValidListing(r,e){if(!await U(this.contractWrapper.getProvider(),this.getAddress(),r.assetContractAddress,r.tokenId,r.sellerAddress))return{valid:!1,error:`Token '${r.tokenId}' from contract '${r.assetContractAddress}' is not approved for transfer`};const n=this.contractWrapper.getProvider(),a=new L(r.assetContractAddress,V,n),s=await a.supportsInterface(_),d=await a.supportsInterface(x);if(s){const p=(await new L(r.assetContractAddress,z,n).ownerOf(r.tokenId)).toLowerCase()===r.sellerAddress.toLowerCase();return{valid:p,error:p?void 0:`Seller is not the owner of Token '${r.tokenId}' from contract '${r.assetContractAddress} anymore'`}}else if(d){const h=(await new L(r.assetContractAddress,H,n).balanceOf(r.sellerAddress,r.tokenId)).gte(e||r.quantity);return{valid:h,error:h?void 0:`Seller does not have enough balance of Token '${r.tokenId}' from contract '${r.assetContractAddress} to fulfill the listing`}}else return{valid:!1,error:"Contract does not implement ERC 1155 or ERC 721."}}}class dt{constructor(r,e){i(this,"contractWrapper",void 0),i(this,"storage",void 0),i(this,"encoder",void 0),i(this,"createListing",f(async t=>{q(t);const n=await W(t.assetContractAddress),a=await W(t.currencyContractAddress);await O(this.contractWrapper,this.getAddress(),n,t.tokenId,await this.contractWrapper.getSignerAddress());const s=await T(this.contractWrapper.getProvider(),t.buyoutPricePerToken,a),d=await T(this.contractWrapper.getProvider(),t.reservePricePerToken,a);let c=Math.floor(t.startTimestamp.getTime()/1e3);const h=(await this.contractWrapper.getProvider().getBlock("latest")).timestamp;return c<h&&(c=h),g.fromContractWrapper({contractWrapper:this.contractWrapper,method:"createListing",args:[{assetContract:n,tokenId:t.tokenId,buyoutPricePerToken:s,currencyToAccept:I(a),listingType:m.Auction,quantityToList:t.quantity,reservePricePerToken:d,secondsUntilEndTime:t.listingDurationInSeconds,startTime:o.from(c)}],parse:u=>({id:this.contractWrapper.parseLogs("ListingAdded",u==null?void 0:u.logs)[0].args.listingId,receipt:u})})})),i(this,"buyoutListing",f(async t=>{const n=await this.validateListing(o.from(t)),a=await Y(this.contractWrapper.getProvider(),n.currencyContractAddress);return this.makeBid.prepare(t,G(n.buyoutPrice,a.decimals))})),i(this,"makeBid",f(async(t,n)=>{const a=await this.validateListing(o.from(t)),s=await T(this.contractWrapper.getProvider(),n,a.currencyContractAddress);if(s.eq(o.from(0)))throw new Error("Cannot make a bid with 0 value");const d=await this.contractWrapper.readContract.bidBufferBps(),c=await this.getWinningBid(t);if(c){const w=K(c.pricePerToken,s,d);A(w,"Bid price is too low based on the current winning bid and the bid buffer")}else{const w=s,P=o.from(a.reservePrice);A(w.gte(P),"Bid price is too low based on reserve price")}const p=o.from(a.quantity),h=s.mul(p),u=await this.contractWrapper.getCallOverrides()||{};return await b(this.contractWrapper,h,a.currencyContractAddress,u),g.fromContractWrapper({contractWrapper:this.contractWrapper,method:"offer",args:[t,a.quantity,a.currencyContractAddress,s,$],overrides:u})})),i(this,"cancelListing",f(async t=>{const n=await this.validateListing(o.from(t)),a=o.from(Math.floor(Date.now()/1e3)),s=o.from(n.startTimeInEpochSeconds),d=await this.contractWrapper.readContract.winningBid(t);if(a.gt(s)&&d.offeror!==l)throw new Q(t.toString());return g.fromContractWrapper({contractWrapper:this.contractWrapper,method:"closeAuction",args:[o.from(t),await this.contractWrapper.getSignerAddress()]})})),i(this,"closeListing",f(async(t,n)=>{n||(n=await this.contractWrapper.getSignerAddress());const a=await this.validateListing(o.from(t));try{return g.fromContractWrapper({contractWrapper:this.contractWrapper,method:"closeAuction",args:[o.from(t),n]})}catch(s){throw s.message.includes("cannot close auction before it has ended")?new E(t.toString(),a.endTimeInEpochSeconds.toString()):s}})),i(this,"executeSale",f(async t=>{const n=await this.validateListing(o.from(t));try{const a=await this.getWinningBid(t);A(a,"No winning bid found");const s=this.encoder.encode("closeAuction",[t,n.sellerAddress]),d=this.encoder.encode("closeAuction",[t,a.buyerAddress]);return g.fromContractWrapper({contractWrapper:this.contractWrapper,method:"multicall",args:[s,d]})}catch(a){throw a.message.includes("cannot close auction before it has ended")?new E(t.toString(),n.endTimeInEpochSeconds.toString()):a}})),i(this,"updateListing",f(async t=>g.fromContractWrapper({contractWrapper:this.contractWrapper,method:"updateListing",args:[t.id,t.quantity,t.reservePrice,t.buyoutPrice,t.currencyContractAddress,t.startTimeInEpochSeconds,t.endTimeInEpochSeconds]}))),this.contractWrapper=r,this.storage=e,this.encoder=new D(r)}getAddress(){return this.contractWrapper.readContract.address}async getListing(r){const e=await this.contractWrapper.readContract.listings(r);if(e.listingId.toString()!==r.toString())throw new v(this.getAddress(),r.toString());if(e.listingType!==m.Auction)throw new F(this.getAddress(),r.toString(),"Direct","Auction");return await this.mapListing(e)}async getWinningBid(r){await this.validateListing(o.from(r));const e=await this.contractWrapper.readContract.winningBid(r);if(e.offeror!==l)return await S(this.contractWrapper.getProvider(),o.from(r),e)}async getWinner(r){const e=await this.validateListing(o.from(r)),t=await this.contractWrapper.readContract.winningBid(r),n=o.from(Math.floor(Date.now()/1e3)),a=o.from(e.endTimeInEpochSeconds);if(n.gt(a)&&t.offeror!==l)return t.offeror;const d=(await this.contractWrapper.readContract.queryFilter(this.contractWrapper.readContract.filters.AuctionClosed())).find(c=>c.args.listingId.eq(o.from(r)));if(!d)throw new Error(`Could not find auction with listingId ${r} in closed auctions`);return d.args.winningBidder}async getBidBufferBps(){return this.contractWrapper.readContract.bidBufferBps()}async getMinimumNextBid(r){const[e,t,n]=await Promise.all([this.getBidBufferBps(),this.getWinningBid(r),await this.validateListing(o.from(r))]),a=t?t.currencyValue.value:n.reservePrice,s=a.add(a.mul(e).div(1e4));return k(this.contractWrapper.getProvider(),n.currencyContractAddress,s)}async validateListing(r){try{return await this.getListing(r)}catch(e){throw console.error(`Error getting the listing with id ${r}`),e}}async mapListing(r){return{assetContractAddress:r.assetContract,buyoutPrice:o.from(r.buyoutPricePerToken),currencyContractAddress:r.currency,buyoutCurrencyValuePerToken:await k(this.contractWrapper.getProvider(),r.currency,r.buyoutPricePerToken),id:r.listingId.toString(),tokenId:r.tokenId,quantity:r.quantity,startTimeInEpochSeconds:r.startTime,asset:await N(r.assetContract,this.contractWrapper.getProvider(),r.tokenId,this.storage),reservePriceCurrencyValuePerToken:await k(this.contractWrapper.getProvider(),r.currency,r.reservePricePerToken),reservePrice:o.from(r.reservePricePerToken),endTimeInEpochSeconds:r.endTime,sellerAddress:r.tokenOwner,type:m.Auction}}}class B{get chainId(){return this._chainId}constructor(r,e,t){let n=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{},a=arguments.length>4?arguments[4]:void 0,s=arguments.length>5?arguments[5]:void 0,d=arguments.length>6&&arguments[6]!==void 0?arguments[6]:new Z(r,e,a,n);i(this,"abi",void 0),i(this,"contractWrapper",void 0),i(this,"storage",void 0),i(this,"encoder",void 0),i(this,"events",void 0),i(this,"estimator",void 0),i(this,"platformFees",void 0),i(this,"metadata",void 0),i(this,"app",void 0),i(this,"roles",void 0),i(this,"interceptor",void 0),i(this,"direct",void 0),i(this,"auction",void 0),i(this,"_chainId",void 0),i(this,"getAll",this.getAllListings),i(this,"buyoutListing",f(async(c,p,h)=>{const u=await this.contractWrapper.readContract.listings(c);if(u.listingId.toString()!==c.toString())throw new v(this.getAddress(),c.toString());switch(u.listingType){case m.Direct:return A(p!==void 0,"quantityDesired is required when buying out a direct listing"),await this.direct.buyoutListing.prepare(c,p,h);case m.Auction:return await this.auction.buyoutListing.prepare(c);default:throw Error(`Unknown listing type: ${u.listingType}`)}})),i(this,"makeOffer",f(async(c,p,h)=>{const u=await this.contractWrapper.readContract.listings(c);if(u.listingId.toString()!==c.toString())throw new v(this.getAddress(),c.toString());const w=await this.contractWrapper.getChainID();switch(u.listingType){case m.Direct:return A(h,"quantity is required when making an offer on a direct listing"),await this.direct.makeOffer.prepare(c,h,R(u.currency)?X[w].wrapped.address:u.currency,p);case m.Auction:return await this.auction.makeBid.prepare(c,p);default:throw Error(`Unknown listing type: ${u.listingType}`)}})),i(this,"setBidBufferBps",f(async c=>{await this.roles.verify(["admin"],await this.contractWrapper.getSignerAddress());const p=await this.getTimeBufferInSeconds();return g.fromContractWrapper({contractWrapper:this.contractWrapper,method:"setAuctionBuffers",args:[p,o.from(c)]})})),i(this,"setTimeBufferInSeconds",f(async c=>{await this.roles.verify(["admin"],await this.contractWrapper.getSignerAddress());const p=await this.getBidBufferBps();return g.fromContractWrapper({contractWrapper:this.contractWrapper,method:"setAuctionBuffers",args:[o.from(c),p]})})),i(this,"allowListingFromSpecificAssetOnly",f(async c=>{const p=[];return(await this.roles.get("asset")).includes(l)&&p.push(this.encoder.encode("revokeRole",[C("asset"),l])),p.push(this.encoder.encode("grantRole",[C("asset"),c])),g.fromContractWrapper({contractWrapper:this.contractWrapper,method:"multicall",args:[p]})})),i(this,"allowListingFromAnyAsset",f(async()=>{const c=[],p=await this.roles.get("asset");for(const h in p)c.push(this.encoder.encode("revokeRole",[C("asset"),h]));return c.push(this.encoder.encode("grantRole",[C("asset"),l])),g.fromContractWrapper({contractWrapper:this.contractWrapper,method:"multicall",args:[c]})})),this._chainId=s,this.abi=j.parse(a||[]),this.contractWrapper=d,this.storage=t,this.metadata=new J(this.contractWrapper,tt,this.storage),this.app=new rt(this.contractWrapper,this.metadata,this.storage),this.roles=new et(this.contractWrapper,B.contractRoles),this.encoder=new D(this.contractWrapper),this.estimator=new at(this.contractWrapper),this.direct=new ct(this.contractWrapper,this.storage),this.auction=new dt(this.contractWrapper,this.storage),this.events=new nt(this.contractWrapper),this.platformFees=new st(this.contractWrapper),this.interceptor=new ot(this.contractWrapper)}onNetworkUpdated(r){this.contractWrapper.updateSignerOrProvider(r)}getAddress(){return this.contractWrapper.readContract.address}async getListing(r){const e=await this.contractWrapper.readContract.listings(r);if(e.assetContract===l)throw new v(this.getAddress(),r.toString());switch(e.listingType){case m.Auction:return await this.auction.mapListing(e);case m.Direct:return await this.direct.mapListing(e);default:throw new Error(`Unknown listing type: ${e.listingType}`)}}async getActiveListings(r){const e=await this.getAllListingsNoFilter(!0),t=this.applyFilter(e,r),n=o.from(Math.floor(Date.now()/1e3));return t.filter(a=>a.type===m.Auction&&o.from(a.endTimeInEpochSeconds).gt(n)&&o.from(a.startTimeInEpochSeconds).lte(n)||a.type===m.Direct&&a.quantity>0)}async getAllListings(r){const e=await this.getAllListingsNoFilter(!1);return this.applyFilter(e,r)}async getTotalCount(){return await this.contractWrapper.readContract.totalListings()}async isRestrictedToListerRoleOnly(){return!await this.contractWrapper.readContract.hasRole(C("lister"),l)}async getBidBufferBps(){return this.contractWrapper.readContract.bidBufferBps()}async getTimeBufferInSeconds(){return this.contractWrapper.readContract.timeBuffer()}async getOffers(r){const e=await this.events.getEvents("NewOffer",{order:"desc",filters:{listingId:r}});return await Promise.all(e.map(async t=>await S(this.contractWrapper.getProvider(),o.from(r),{quantityWanted:t.data.quantityWanted,pricePerToken:t.data.quantityWanted.gt(0)?t.data.totalOfferAmount.div(t.data.quantityWanted):t.data.totalOfferAmount,currency:t.data.currency,offeror:t.data.offeror})))}async getAllListingsNoFilter(r){return(await Promise.all(Array.from(Array((await this.contractWrapper.readContract.totalListings()).toNumber()).keys()).map(async t=>{let n;try{n=await this.getListing(t)}catch(a){if(a instanceof v)return;console.warn(`Failed to get listing ${t}' - skipping. Try 'marketplace.getListing(${t})' to get the underlying error.`);return}if(n.type===m.Auction)return n;if(r){const{valid:a}=await this.direct.isStillValidListing(n);if(!a)return}return n}))).filter(t=>t!==void 0)}applyFilter(r,e){let t=[...r];const n=o.from((e==null?void 0:e.start)||0).toNumber(),a=o.from((e==null?void 0:e.count)||it).toNumber();return e&&(e.seller&&(t=t.filter(s=>{var d;return s.sellerAddress.toString().toLowerCase()===((d=e==null?void 0:e.seller)==null?void 0:d.toString().toLowerCase())})),e.tokenContract&&(t=t.filter(s=>{var d;return s.assetContractAddress.toString().toLowerCase()===((d=e==null?void 0:e.tokenContract)==null?void 0:d.toString().toLowerCase())})),e.tokenId!==void 0&&(t=t.filter(s=>{var d;return s.tokenId.toString()===((d=e==null?void 0:e.tokenId)==null?void 0:d.toString())})),t=t.filter((s,d)=>d>=n),t=t.slice(0,a)),t}async prepare(r,e,t){return g.fromContractWrapper({contractWrapper:this.contractWrapper,method:r,args:e,overrides:t})}async call(r,e,t){return this.contractWrapper.call(r,e,t)}}i(B,"contractRoles",["admin","lister","asset"]);export{B as Marketplace};
