let AllUsers = [
    'Client',
    'Atelier',
    'Finance'
]

let Client = [
    'Client',
]

let Atelier = [
    'Atelier',
]

let Financier = [
    'Finance',
]

let ClientFinancier = [
    "Finance",
    "Client"
]

let AtelierFinancier = [
    "Finance",
    "Atelier"
]

let ClientAtelier = [
    "Client",
    "Atelier"
]

module.exports = {
    AllUsers,
    Client,
    ClientAtelier,
    ClientFinancier,
    Financier,
    Atelier,
    AtelierFinancier
}