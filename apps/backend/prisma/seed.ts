import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export async function seed() {
    await prisma.pajamaSize.deleteMany()
    await prisma.sale.deleteMany()
    await prisma.address.deleteMany()
    await prisma.pajama.deleteMany()
    await prisma.feedback.deleteMany()
    await prisma.user.deleteMany()

    const password = await bcrypt.hash('123456', 8)

    await prisma.user.createMany({
        data: [
            { name: 'Admin', email: 'admin@email.com', username: 'admin', password },
            { name: 'user1', email: 'user1@gmail.com', username: 'user1', password },
            { name: 'user2', email: 'user2@gmail.com', username: 'user2', password },
            { name: 'user3', email: 'user3@gmail.com', username: 'user3', password },
            { name: 'user4', email: 'user4@gmail.com', username: 'user4', password },

        ],
    })

    const produtos = [
        { name: "Pijama Feminino Bolinhas", description: "Descrição para Pijama Feminino Bolinhas.", image: "src/assets/pijama/pijama.png", price: 99.9, season: "verao", type: "adulto", gender: "feminino", favorite: false, on_sale: true, sale_percent: 33 },
        { name: "Pijama Masculino Listrado", description: "Descrição para Pijama Masculino Listrado.", image: "src/assets/pijama/pijama.png", price: 129.9, season: "inverno", type: "infantil", gender: "masculino", favorite: false, on_sale: false, sale_percent: null },
        { name: "Pijama Infantil Estrela", description: "Descrição para Pijama Infantil Estrela.", image: "src/assets/pijama/pijama.png", price: 78.9, season: "inverno", type: "adulto", gender: "infantil", favorite: false, on_sale: true, sale_percent: 24 },
        { name: "Pijama Unissex de Cetim", description: "Descrição para Pijama Unissex de Cetim.", image: "src/assets/pijama/pijama.png", price: 159.9, season: "verao", type: "infantil", gender: "unissex", favorite: false, on_sale: false, sale_percent: null },
        { name: "Pijama Moletom C/ Capuz", description: "Descrição para Pijama Moletom C/ Capuz.", image: "src/assets/pijama/pijama.png", price: 189.9, season: "inverno", type: "adulto", gender: "masculino", favorite: false, on_sale: true, sale_percent: 16 },
        { name: "Camisola com Estampa", description: "Descrição para Camisola com Estampa.", image: "src/assets/pijama/pijama.png", price: 89.9, season: "verao", type: "infantil", gender: "feminino", favorite: false, on_sale: false },
        { name: "Pijama de Malha Fria", description: "Descrição para Pijama de Malha Fria.", image: "src/assets/pijama/pijama.png", price: 105.9, season: "verao", type: "infantil", gender: "masculino", favorite: false, on_sale: true, sale_percent: 15 },
        { name: "Short Doll de Bolinhas", description: "Descrição para Short Doll de Bolinhas.", image: "src/assets/pijama/pijama.png", price: 79.9, season: "verao", type: "adulto", gender: "feminino", favorite: false, on_sale: false },
        { name: "Pijama Curto Unissex", description: "Descrição para Pijama Curto Unissex.", image: "src/assets/pijama/pijama.png", price: 95.9, season: "verao", type: "infantil", gender: "unissex", favorite: false, on_sale: true, sale_percent: 17 },
        { name: "Robe de Cetim Curto", description: "Descrição para Robe de Cetim Curto.", image: "src/assets/pijama/pijama.png", price: 139.9, season: "verao", type: "adulto", gender: "feminino", favorite: false, on_sale: false },
        { name: "Pijama para Bebê", description: "Descrição para Pijama para Bebê.", image: "src/assets/pijama/pijama.png", price: 69.9, season: "verao", type: "infantil", gender: "feminino", favorite: false, on_sale: true, sale_percent: 21 },
        { name: "Pijama de Inverno Lã", description: "Descrição para Pijama de Inverno Lã.", image: "src/assets/pijama/pijama.png", price: 209.9, season: "inverno", type: "adulto", gender: "unissex", favorite: false, on_sale: true, sale_percent: 24 },
    ]
    const createdPajamas = []

    for (const produto of produtos) {
        const pj = await prisma.pajama.create({
            data: {
                ...produto,
                sale_percent: produto.on_sale ? produto.sale_percent ?? 0 : null,
            },
        })

        createdPajamas.push(pj)

        await prisma.pajamaSize.createMany({
            data: [
                { pajamaId: pj.id, size: 'PP', stock_quantity: 5 },
                { pajamaId: pj.id, size: 'P', stock_quantity: 8 },
                { pajamaId: pj.id, size: 'M', stock_quantity: 12 },
                { pajamaId: pj.id, size: 'G', stock_quantity: 10 },
                { pajamaId: pj.id, size: 'GG', stock_quantity: 6 },
            ],
        })
    }


    const feedbacks = [
        { name: 'Ana Silva', description: 'Amei o tecido, muito confortável!', rating: 4.9 },
        { name: 'Carlos Souza', description: 'Entrega rápida e bem embalado.', rating: 5.0 },
        { name: 'Mariana Lima', description: 'Gostei do modelo, mas esperava mais.', rating: 4.0 },
        { name: 'Bruno Rocha', description: 'Perfeito para o inverno.', rating: 4.7 },
        { name: 'Luana Castro', description: 'Recomendo muito, ótimo custo-benefício.', rating: 4.8 },
        { name: 'Rafaela Mendes', description: 'Tamanhos condizentes com a tabela.', rating: 4.5 },
        { name: 'João Pedro', description: 'Produto bom, mas demorou a chegar.', rating: 3.9 },
        { name: 'Camila Souza', description: 'Design moderno, adorei!', rating: 4.6 },
        { name: 'Felipe Gomes', description: 'Boa qualidade, mas podia ter mais cores.', rating: 4.2 },
        { name: 'Isabela Duarte', description: 'Presenteei minha irmã, ela amou!', rating: 4.9 },
        { name: 'Lucas Araujo', description: 'Tecido esquenta bem, ideal pra frio.', rating: 4.8 },
        { name: 'Vanessa Lima', description: 'Veio com pequeno defeito, mas trocaram rápido.', rating: 4.3 },
        { name: 'Diego Nascimento', description: 'Melhor pijama que já comprei.', rating: 5.0 },
        { name: 'Tatiane Oliveira', description: 'A malha é super gostosa, recomendo.', rating: 4.7 },
        { name: 'Gustavo Martins', description: 'Visual bonito, tamanho certinho.', rating: 4.6 },
        { name: 'Beatriz Carvalho', description: 'Atendimento ótimo e entrega no prazo.', rating: 4.7 },
        { name: 'Eduardo Farias', description: 'Gostei muito, o tamanho ficou perfeito.', rating: 4.8 },
        { name: 'Juliana Mendes', description: 'Produto de excelente qualidade!', rating: 5.0 },
        { name: 'Rogério Teixeira', description: 'Boa compra, voltaria a comprar.', rating: 4.6 },
        { name: 'Patrícia Lima', description: 'Tecido macio e muito confortável.', rating: 4.9 },
        { name: 'Murilo Torres', description: 'Chegou bem embalado, tudo certo.', rating: 4.5 },
        { name: 'Renata Silva', description: 'Achei o preço um pouco alto, mas valeu a pena.', rating: 4.2 },
        { name: 'Vinícius Barros', description: 'Entrega atrasou 1 dia, mas o produto é bom.', rating: 4.0 },
        { name: 'Letícia Costa', description: 'Modelos lindos e super estilosos.', rating: 4.9 },
        { name: 'Ricardo Fernandes', description: 'O tecido podia ser mais grosso.', rating: 3.8 },
        { name: 'Tatiana Lopes', description: 'Presenteei meu marido e ele adorou!', rating: 5.0 },
        { name: 'André Martins', description: 'Atendimento pós-venda foi excelente.', rating: 4.7 },
        { name: 'Sabrina Rocha', description: 'Malha leve, ideal para o verão.', rating: 4.6 },
        { name: 'Henrique Nunes', description: 'Produto bem costurado e bonito.', rating: 4.8 },
        { name: 'Lorena Freitas', description: 'Recomendo para quem gosta de conforto.', rating: 5.0 },
        { name: 'Joana Ribeiro', description: 'Adorei o modelo, mas o tamanho M ficou grande.', rating: 4.3 },
        { name: 'Mateus Brito', description: 'Preço justo pela qualidade entregue.', rating: 4.5 },
        { name: 'Carolina Peixoto', description: 'Visual lindo, tecido ótimo.', rating: 4.9 },
        { name: 'Marcelo Souza', description: 'Podia vir com uma sacola para presente.', rating: 4.1 },
        { name: 'Nathália Almeida', description: 'Ficou lindo no corpo, super recomendo!', rating: 4.9 },
    ]

    await prisma.feedback.createMany({ data: feedbacks })

    const address1 = await prisma.address.create({
        data: {
            zip_code: '12345-000',
            state: 'SP',
            city: 'São Paulo',
            neighborhood: 'Centro',
            address: 'Rua das Pijamas',
            number: '123',
        },
    })

    const address2 = await prisma.address.create({
        data: {
            zip_code: '54321-000',
            state: 'RJ',
            city: 'Rio de Janeiro',
            neighborhood: 'Copacabana',
            address: 'Avenida do Sono',
            number: '456',
        },
    })

    await prisma.sale.create({
        data: {
            buyer_name: 'Cliente 1',
            cpf: '111.111.111-11',
            price: 199.80,
            payment_method: 'credit_card',
            installments: 2,
            card_number: '1234-5678-9012-3456',
            addressId: address1.id,
            pajamas: {
                create: [
                    {
                        pajama: { connect: { id: createdPajamas[0]?.id } },
                        quantity: 2,
                        price: 99.90,
                    },
                ],
            },
        },
    })

    await prisma.sale.create({
        data: {
            buyer_name: 'Cliente 2',
            cpf: '222.222.222-22',
            price: 129.90,
            payment_method: 'boleto',
            installments: 1,
            card_number: null,
            addressId: address2.id,
            pajamas: {
                create: [
                    {
                        pajama: { connect: { id: createdPajamas[1]?.id } },
                        quantity: 1,
                        price: 129.90,
                    },
                ],
            },
        },
    })

    console.log(`✅ Banco populado com ${produtos.length} pijamas, ${feedbacks.length} feedbacks, 2 usuários e 2 vendas.`)
}

seed()
    .then(() => {
        console.log('Seeding completed successfully.')
        prisma.$disconnect()
        process.exit(0)
    })
    .catch((error) => {
        console.error('Error during seeding:', error)
        prisma.$disconnect()
        process.exit(1)
    })