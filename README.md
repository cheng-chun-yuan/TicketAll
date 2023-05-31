
# TicketAll
This is an Anti-Scalper application designed to utilize Fido, Quadratic Voting, and ERC721 non-transferable features to prevent ticket scalping. We are committed to protecting consumer rights and providing them with a fair ticket purchasing experience.
## Feature
- **Fido Authentication**: We implement Fido authentication to ensure secure and reliable user verification. This helps prevent Scalper from minting nft and selling wallet to others.
- **Quadratic Voting**: We leverage Quadratic Voting as a mechanism to purchase the Buy Authority. This prevents users to bulk purchase the ticket since the quadratic cost growth.
- **ERC721 Non-Transferable Tokens**: We utilize ERC721 tokens with non-transferable characteristics to represent tickets. Each ticket token is unique and cannot be transferred or resold, mitigating the ability of scalpers to profit from ticket resale.
- **Dutch Auction Methodology**: We employ the Dutch auction method for ticket sales. This auction type starts with a high price and gradually lowers it until a buyer is willing to purchase the ticket at the current price. This discourages scalpers from acquiring tickets at lower prices and reselling them at inflated prices.
- **User Reporting**: Users can report suspected scalpers or instances of ticket scalping through the application. This allows us to investigate reported incidents and take appropriate action against scalpers.
- **Blocking Functionality**: Once a scalper is identified and confirmed through user reports or other means, we promptly block their account and restrict their access to prevent further scalping activities.
- **Dual-Token Economy**: Our application incorporates a dual-token economy. The first token named BmT is a tradable token that can be freely bought and sold on the market. It acts as a representation of value within the system.
- **Second Token with Staking Mechanism**: The second token is non-transferable and can only be obtained by staking the first token. This token is used to purhase Buy Authority and serves as a measure to prevent ticket scalping. Users must stake some first token to acquire the second token.
- **Refund Mechanism**: Since our NFT Ticket is non-transferable,the Ticket can only be refunded. We set the refund amount as the 0.9 of Auction price.
## How to use it
- **Buy BmT Token**
- **Stake BmT Token to get BA Token**
- **Get Buy Authority**
- **Mint NFT by Buy Authority**
## Try your own website
```
git clone https://github.com/cheng-chun-yuan/TicketAll.git
cd TicketAll
yarn
yarn dev
```
>>>>>>> 72378444a6d810837c81302ccbd087647714a7d0
