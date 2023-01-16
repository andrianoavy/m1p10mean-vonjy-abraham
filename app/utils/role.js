let AllUsers = [
    'Client',
    'Atelier',
    'Financier'
]

let Client = [
    'Client',
]

let Atelier = [
    'Atelier',
]

let Financier = [
    'Financier',
]

let ClientFinancier = [
    "Financier",
    "Client"
]

let AtelierFinancier = [
    "Financier",
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