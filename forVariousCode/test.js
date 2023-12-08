

function* bankAccount() {
    let balance = 0;
    while (balance >= 0) { 
        balance += yield balance;
    }
    return 'bankrupt';
}

let acct = bankAccount();
acct.next();
console.log(acct.next(100).done);
console.log(acct.next(-10).value);
console.log(acct.next(-60).value);
let stat = acct.next(-100); 
console.log(stat);