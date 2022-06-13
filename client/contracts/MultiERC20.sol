// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./contracts/utils/Context.sol";
//import "hardhat/console.sol";

contract MultiERC20 is Context{

    struct ERC20Data{
        mapping(address => uint256)  _balances;

        mapping(address => mapping(address => uint256)) _allowances;

        uint256 _totalSupply;

        string  _name;
        string  _symbol;
    }
    mapping(address => ERC20Data)   PersonalCoins;

    string private _name;
    string private _symbol;


    /**
     * @dev Emitted when `value` tokens are moved from one account (`from`) to
     * another (`to`).
     *
     * Note that `value` may be zero.
     */
    event Transfer(address issuer, address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitted when the allowance of a `spender` for an `owner` is set by
     * a call to {approve}. `value` is the new allowance.
     */
    event Approval(address issuer, address indexed owner, address indexed spender, uint256 value);


    constructor(string memory name_, string memory symbol_) {
        _name = name_;
        _symbol = symbol_;
    }


    /**
     * @dev Returns the name of the token.
     */
    function name(address issuer) public view virtual returns (string memory) {
        return PersonalCoins[issuer]._name;
    }

    /**
     * @dev Returns the symbol of the token, usually a shorter version of the
     * name.
     */
    function symbol(address issuer) public view virtual returns (string memory) {
        return PersonalCoins[issuer]._symbol;
    }

    function decimals() public view virtual returns (uint8) {
        return 18;
    }

    function issue(address issuer, string memory name_, string memory symbol_, uint256 totalSupply_) public {
        PersonalCoins[issuer]._name = name_;
        PersonalCoins[issuer]._symbol = symbol_;
        PersonalCoins[issuer]._totalSupply = totalSupply_;
        //console.log("issuer:" , issuer);
        //console.log("supply:" , PersonalCoins[issuer]._totalSupply);
    }

    function mint(address issuer, address account, uint256 amount) public{
        _mint(issuer, account, amount);
    }
    /**
     * @dev See {IERC20-totalSupply}.
     */
    function totalSupply(address issuer) public view virtual returns (uint256) {
        return PersonalCoins[issuer]._totalSupply;
    }


    function balanceOf(address issuer, address account) public view virtual returns (uint256) {
        return PersonalCoins[issuer]._balances[account];
    }

    function transfer(address issuer, address recipient, uint256 amount) public virtual returns (bool) {
        _transfer(issuer, _msgSender(), recipient, amount);
        return true;
    }

    function allowance(address issuer, address owner, address spender) public view virtual returns (uint256) {
        return PersonalCoins[issuer]._allowances[owner][spender];
    }


    function approve(address issuer, address spender, uint256 amount) public virtual returns (bool) {
        _approve(issuer, _msgSender(), spender, amount);
        return true;
    }

    function transferFrom(
        address issuer, 
        address sender,
        address recipient,
        uint256 amount
    ) public virtual returns (bool) {
        _transfer(issuer, sender, recipient, amount);

        uint256 currentAllowance = PersonalCoins[issuer]._allowances[sender][_msgSender()];
        require(currentAllowance >= amount, "ERC20: transfer amount exceeds allowance");
        unchecked {
            _approve(issuer, sender, _msgSender(), currentAllowance - amount);
        }

        return true;
    }


    function increaseAllowance(address issuer, address spender, uint256 addedValue) public virtual returns (bool) {
        _approve(issuer, _msgSender(), spender, PersonalCoins[issuer]._allowances[_msgSender()][spender] + addedValue);
        return true;
    }

    function decreaseAllowance(address issuer, address spender, uint256 subtractedValue) public virtual returns (bool) {
        uint256 currentAllowance = PersonalCoins[issuer]._allowances[_msgSender()][spender];
        require(currentAllowance >= subtractedValue, "ERC20: decreased allowance below zero");
        unchecked {
            _approve(issuer, _msgSender(), spender, currentAllowance - subtractedValue);
        }

        return true;
    }


    function _transfer(
        address issuer,
        address sender,
        address recipient,
        uint256 amount
    ) internal virtual {
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");

        _beforeTokenTransfer(sender, recipient, amount);

        uint256 senderBalance = PersonalCoins[issuer]._balances[sender];
        require(senderBalance >= amount, "ERC20: transfer amount exceeds balance");
        unchecked {
            PersonalCoins[issuer]._balances[sender] = senderBalance - amount;
        }
        PersonalCoins[issuer]._balances[recipient] += amount;

        emit Transfer(issuer, sender, recipient, amount);

        _afterTokenTransfer(sender, recipient, amount);
    }


    function _mint(address issuer, address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: mint to the zero address");

        _beforeTokenTransfer(address(0), account, amount);

        PersonalCoins[issuer]._totalSupply += amount;
        PersonalCoins[issuer]._balances[account] += amount;
        emit Transfer(issuer, address(0), account, amount);

        _afterTokenTransfer(address(0), account, amount);
    }


    function _burn(address issuer, address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: burn from the zero address");

        _beforeTokenTransfer(account, address(0), amount);

        uint256 accountBalance = PersonalCoins[issuer]._balances[account];
        require(accountBalance >= amount, "ERC20: burn amount exceeds balance");
        unchecked {
            PersonalCoins[issuer]._balances[account] = accountBalance - amount;
        }
        PersonalCoins[issuer]._totalSupply -= amount;

        emit Transfer(issuer, account, address(0), amount);

        _afterTokenTransfer(account, address(0), amount);
    }

    function _approve(
        address issuer,
        address owner,
        address spender,
        uint256 amount
    ) internal virtual {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        PersonalCoins[issuer]._allowances[owner][spender] = amount;
        emit Approval(issuer, owner, spender, amount);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual {}

    function _afterTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual {}
}