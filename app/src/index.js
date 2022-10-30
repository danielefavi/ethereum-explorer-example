const EthereumExplorer = require('ethereum-explorer');

const ContractAbiJson = require('/../build/contracts/MessageCenter.json');

const ethExp = new EthereumExplorer();

bootEthereumExplorer();

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('callMessage-btn').addEventListener('click', callMessage);
    document.getElementById('callSpecialMessage-btn').addEventListener('click', callSpecialMessage);
    document.getElementById('callGetMessage-btn').addEventListener('click', callGetMessage);
    document.getElementById('updateMessage-btn').addEventListener('click', updateMessage);
    document.getElementById('updateMessageSelfSigned-btn').addEventListener('click', updateMessageSelfSigned);
    document.getElementById('updateSpecialMessage-btn').addEventListener('click', updateSpecialMessage);
    document.getElementById('updateSpecialMessageSelfSigned-btn').addEventListener('click', updateSpecialMessageSelfSigned);
    document.getElementById('fnc-load-events').addEventListener('click', loadEventsFromSmartContracts);
    document.getElementById('fnc-get-block-info').addEventListener('click', getBlockInfo);
});

function consoleLog(msg) {
    if (typeof msg == 'object') msg = JSON.stringify(msg, null, '    ');

    consoleElem = document.getElementById('console');
    consoleElem.innerHTML += (new Date).toISOString() + ': ' + msg + '<br>';
    
    consoleElem.scrollTop = consoleElem.scrollHeight;
    consoleElem.scrollIntoView(false);
}

function consoleError(error) {
    console.log(error);
    consoleLog('ERROR: ' + error.message + '<br>Check the browser console for more info.<br>');
}

async function getBlockInfo() {
    const blockNumber = document.getElementById('fnc-get-block-info-from-block').value;
    try {
        consoleLog(await ethExp.getBlock(blockNumber));
    } catch (error) {
        consoleError(error);
    }
}

async function bootEthereumExplorer() {
    try {
        consoleLog('Booting the Ethereum Explorer and connecting to the blockchain...');
        await ethExp.bootWeb3();
        consoleLog('Connected to the blockchain!');

        consoleLog('Initializing smart contracts...');
        await initSmartContract();
        consoleLog('Smart contracts initialized!');

        for(var elem of document.getElementsByClassName('functions-table')) {
            elem.classList.remove('d-none');
        }
    } catch (error) {
        consoleError(error);
    }
}

function loadEventsFromSmartContracts() {
    const fromBlock = document.getElementById('from-block-number').value;

    ethExp.contract('MessageCenter').events.allEvents({ fromBlock }, (error, event) => consoleLog(error))
        .on("connected", subscriptionId => consoleLog(subscriptionId))
        .on('data', event => consoleLog(event))
        .on('changed', event => consoleLog(event))
        .on('error', (error, receipt) => consoleLog({ error, receipt }));
}

async function updateSpecialMessageSelfSigned() {
    try {
        consoleLog('Calling "updateSpecialMessage" with a self signed transaction...');
        
        const message = document.getElementById('updateSpecialMessageSelfSigned-message').value;
        const userAddress = document.getElementById('updateSpecialMessageSelfSigned-address').value;
        const privateKey = document.getElementById('updateSpecialMessageSelfSigned-pkey').value;
        const valueTx = document.getElementById('updateSpecialMessageSelfSigned-value').value;

        (await ethExp.sendTxToSmartContract(userAddress, privateKey, 'updateSpecialMessage', [message], {value:valueTx}, 'MessageCenter'))
            .on('transactionHash', transactionHash => consoleLog('TX hash: ' + transactionHash + ' - Check the browser console for more info.'))
            .on('receipt', receipt => console.log(receipt))
            .on('error', error => console.log(error));
    } catch (error) {
        consoleError(error);
    }
}

async function updateSpecialMessage() {
    try {
        consoleLog('Calling "updateSpecialMessage" to update "specialMessage"...');

        const userAddress = await ethExp.getUserAccount();
        const message = document.getElementById('updateSpecialMessage-message').value;
        const valueTx = document.getElementById('updateSpecialMessage-value').value;

        (await ethExp.sendTxToSmartContract(userAddress, null, 'updateSpecialMessage', [message], {value:valueTx}, 'MessageCenter'))
            .on('transactionHash', transactionHash => consoleLog('TX hash: ' + transactionHash + ' - Check the browser console for more info.'))
            .on('receipt', receipt => console.log(receipt))
            .on('error', error => console.log(error));
    } catch (error) {
        consoleError(error);
    }

}

async function updateMessage() {
    try {
        consoleLog('Calling "updateMessage" to update "message"...');

        const userAddress = await ethExp.getUserAccount();
        const message = document.getElementById('updateMessage-message').value;
    
        (await ethExp.sendTxToSmartContract(userAddress, null, 'updateMessage', [message], {}, 'MessageCenter'))
            .on('transactionHash', transactionHash => consoleLog('TX hash: ' + transactionHash + ' - Check the browser console for more info.'))
            .on('receipt', receipt => console.log(receipt))
            .on('error', error => consoleError(error));
    } catch (error) {
        consoleError(error);
    }
}

async function updateMessageSelfSigned() {
    try {
        consoleLog('Calling "updateMessage" with a self signed transaction...');

        const message = document.getElementById('updateMessageSelfSigned-message').value;
        const userAddress = document.getElementById('updateMessageSelfSigned-address').value;
        const privateKey = document.getElementById('updateMessageSelfSigned-pkey').value;
    
        (await ethExp.sendTxToSmartContract(userAddress, privateKey, 'updateMessage', [message], {}, 'MessageCenter'))
            .on('transactionHash', transactionHash => consoleLog('TX hash: ' + transactionHash + ' - Check the browser console for more info.'))
            .on('receipt', receipt => console.log(receipt))
            .on('error', error => consoleError(error));
    } catch (error) {
        consoleError(error);
    }

}

async function callMessage() {
    try {
        consoleLog('Calling "message" from the smart contract...');
        var message = await ethExp.call('message', null, 'MessageCenter');
        consoleLog('"message" value is: ' + message);
    } catch (error) {
        consoleError(error);
    }
}

async function callSpecialMessage() {
    try {
        consoleLog('Calling "specialMessage" from the smart contract...');
        var specialMessage = await ethExp.call('specialMessage', null, 'MessageCenter');
        consoleLog('"specialMessage" value is: ' + specialMessage);
    } catch (error) {
        consoleError(error);
    }
}

async function callGetMessage() {
    try {
        consoleLog('Calling the getMessage() function from the smart contract...');
        var val = await ethExp.call('getMessage', null, 'MessageCenter');
        consoleLog('getMessage(): ' + val);
    } catch (error) {
        consoleError(error);
    }
}


async function initSmartContract() {
    const netId = await ethExp.getNetworkId();

    ethExp.loadContact(
        ContractAbiJson.networks[netId].address, 
        ContractAbiJson.abi,
        'MessageCenter'
    );
}

async function getLatestBlock() {
    const block = await ethExp.getBlock('latest');
    console.log(block);
}