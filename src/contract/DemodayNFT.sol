// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract emooooNFT is ERC721 {
    //setting argument
    IERC20 public token = IERC20(0x302bf904a598A1C3eeCcc2E2c5971b734F52A501); //the second token cost for mint NFT 
    address public owner; //people who construct the contrast
    uint256 public maxSupply; //total supply
    uint256 public nftPrice; // the price of NFT(initial)
    event Refund(uint256 _tokenId,uint256 refundAmount,uint256 timestamp,address from); //to show the event of refund 
    event firstmint(uint256 _tokenId, address to, uint256 timestamp);
    event finalmint(uint256 _tokenId, address to, uint256 timestamp); 
    uint256 public nowSupply = 0; //the current mint number
    string private baseURI; // the picture's baseURL
    uint256 public maxPerWallet; //the max NFT number for
    uint256 public nextSaleNumber = 0;
    uint256 public totalmintAuthority = 0;
    mapping(address => uint256) public pointBalances ; // Points balance of each user
    mapping(uint256 => bool) public ticketUsed;
    using Strings for uint256;
    uint256 public rerefund = 0;

    // construct the contrast with specific name symbol maxSupply nftPrice maxPerWallet IERC_token
    constructor(
        uint256 _maxSupply,
        uint256 _nftPrice,
        uint256 _maxPerWallet
        
    ) ERC721("Lauv_Concert", "LAUV") {
        maxSupply = _maxSupply;
        nftPrice = _nftPrice;
        owner = msg.sender;
        maxPerWallet = _maxPerWallet;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "no permission");
        _;
    }
    //checkwalletbalance
    modifier checkbalance() {
        require(msg.sender.balance >= 0.1 ether , "please add more money to your account");
        _;
    }
    // //change TokenURL to 
    function enterTicket(uint256 _tokenId) public {
        // Todo 
        require(msg.sender == owner, "no permission");
        require(_exists(_tokenId), "Token does not exist");
        ticketUsed[_tokenId] = true;
    }

    function used_Ticket(uint256 _tokenId) public view returns (bool) {
        return ticketUsed[_tokenId];
    }
    function _baseURI() internal pure override returns (string memory) {
        return "https://gateway.pinata.cloud/ipfs/QmfAPy6SU7MV6qo8V5RVaWwbB3JRtKXngy7N46V45qxaTs/";
    }
    // //according to how many NFT it mint , change the tokenURL
    function tokenURI(uint256 _tokenId) public view override returns (string memory) {
        // Todo
        _requireMinted(_tokenId);
        // uint256 picture = balanceOf(ownerOf(_tokenId));
        if(used_Ticket(_tokenId)){
            return string(abi.encodePacked("https://gateway.pinata.cloud/ipfs/QmdDzL4Rb2JLcJdQPtNuCJSZ5TTZKwYJXbbjyqVq49iyyL/commemorative_ticket.json"));
        }
        uint256 num = balanceOf(ownerOf(_tokenId));
        // return string(abi.encodePacked("https://gateway.pinata.cloud/ipfs/QmdDzL4Rb2JLcJdQPtNuCJSZ5TTZKwYJXbbjyqVq49iyyL/", picture.toString(), ".json"));
        return string(abi.encodePacked(_baseURI(),num.toString(),".json"));
    }


    // count how many point(second token) it need to mint
    function calculatePoint(uint256 _mintAmount ,address adddr) public view returns (uint256) {
        //check how many nft in wallet
        uint256 nowAmount = balanceOf(adddr) + pointBalances[adddr];
        uint256 sum = (_mintAmount + 1 + nowAmount + nowAmount) * _mintAmount / 2;
        return sum;
    }

    //use point to prepurchase NFT
    function buyCallOption(uint256 _mintAmount) public payable checkbalance(){
        uint256 costNum = calculatePoint(_mintAmount,msg.sender);
        // // Check that the user has approved the transfer of tokens to this contract
        token.approve(address(this), costNum);
        require(token.transferFrom(msg.sender, address(this), costNum), "Token transfer failed");
        // Credit the user's account with the points
        totalmintAuthority+= _mintAmount;
        pointBalances[msg.sender] += _mintAmount;
    }
    function useCallOption(uint256 _mintAmount) internal{
        pointBalances[msg.sender] -= _mintAmount;
        totalmintAuthority -= _mintAmount;
    }
    function getCallOption() public view checkbalance() returns (uint256){
        return pointBalances[msg.sender];
    }

    //荷蘭拍
    struct Auction {
        uint256 startTime;
        uint256 timeStep;
        uint256 startPrice;
        uint256 endPrice;
        uint256 priceStep;
        uint256 stepNumber;
    }
    Auction public auction; 
    //getcurrentprice
    function getAuctionPrice() public view returns (uint256) {
        Auction memory currentAuction = auction;
        if (block.timestamp < currentAuction.startTime) {
            return currentAuction.startPrice;
        }
        uint256 step = (block.timestamp - currentAuction.startTime) /
            currentAuction.timeStep;
        if (step > currentAuction.stepNumber) {
            step = currentAuction.stepNumber;
        }
        return
            currentAuction.startPrice > step * currentAuction.priceStep
                ? currentAuction.startPrice - step * currentAuction.priceStep
                : currentAuction.endPrice;
    }
    function setToken(address addr) public onlyOwner {
        token = IERC20(addr); 
    }
    
    function setAuction(
        uint256 _startTime,
        uint256 _timeStep,
        uint256 _endPrice,
        uint256 _priceStep,
        uint256 _stepNumber
    ) public onlyOwner {
        auction.startTime = _startTime; // 開始時間
        auction.timeStep = _timeStep; // 5 多久扣一次
        auction.startPrice = nftPrice; // 50000000000000000 起始金額
        auction.endPrice = _endPrice; // 10000000000000000 最後金額
        auction.priceStep = _priceStep; // 10000000000000000 每次扣除多少金額
        auction.stepNumber = _stepNumber; // 5 幾個階段
        rerefund += 1; 
    }

    function auctionmintNFT(uint256 _mintAmount) public payable checkbalance(){
    //new version
        // uint256 amountToken = calculatePoint(_mintAmount);
        require(rerefund == 1, "not open");
        require(getCallOption() >= _mintAmount, "Buy call option first");
        uint256 amountETH = _mintAmount * getAuctionPrice();
        require(
            balanceOf(msg.sender) + _mintAmount <= maxPerWallet,
            "exceed max wallet limit"
        );
		require(msg.value == amountETH, "Must send the correct amount of ETH");
        require(nowSupply + _mintAmount <= maxSupply, "sold out");
        useCallOption(_mintAmount);
        for (uint256 i = 0; i < _mintAmount; i++) {
            uint256 newTokenId = nowSupply + 1;
            nowSupply++;
            _safeMint(msg.sender, newTokenId);
            emit firstmint(newTokenId,msg.sender,block.timestamp);
        }
        
    }
    function FinalmintNFT(uint256 _mintAmount) public payable checkbalance(){
    //new version
        // uint256 amountToken = calculatePoint(_mintAmount);
        require(rerefund == 2, "not open");
        require(getCallOption() >= _mintAmount, "Buy call option first");
        uint256 amountETH = _mintAmount * getAuctionPrice();
        require(
            balanceOf(msg.sender) + _mintAmount <= maxPerWallet,
            "exceed max wallet limit"
        );
		require(msg.value == amountETH, "Must send the correct amount of ETH");
        require(nowSupply + _mintAmount <= maxSupply+nextSaleNumber, "sold out");
        useCallOption(_mintAmount);
        for (uint256 i = 0; i < _mintAmount; i++) {
            uint256 newTokenId = nowSupply + 1;
            nowSupply++;
            _safeMint(msg.sender, newTokenId);
            emit finalmint(newTokenId,msg.sender,block.timestamp);
        }
        
    }
    //get the money from contract
    function withdraw() public payable{
        require(msg.sender == owner, "Only the contract owner can withdraw");
        payable(msg.sender).transfer(address(this).balance);
    }
    function check(address addr) public view returns (bool) {
        return addr.balance >= 0.05 ether;
    }
    //refund
    function refund(uint256 _tokenId) external payable {
        require(rerefund < 2, "Now cannot refund");
        require(_exists(_tokenId), "ERC721A: nonexistent token");
        require(msg.sender == ownerOf(_tokenId), "ERC721A: only token owner can request refund");

        uint256 refundAmount = getAuctionPrice() * 9 / 10;

        // 确保项目方已经向合约转移了足够的以太币来支付退款
        //how to cheak the owner balance?
        require(address(this).balance >= refundAmount, "ERC721A: insufficient funds for refund");
        // 销毁 NFT
        _burn(_tokenId);
        nextSaleNumber++;
        // 发送退款给申请者
        payable(msg.sender).transfer(refundAmount);
        emit Refund(_tokenId, refundAmount,block.timestamp,msg.sender);
    }

    //transfer override with price limit
    function _transfer(address from, address to, uint256 tokenId) internal override {
        require(msg.sender == owner, "Transfer not authorized");
        super._transfer(from, to, tokenId);
    }
}