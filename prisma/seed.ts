import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const categories = [
        { name: 'Development' },
        { name: 'Business' },
        { name: 'Finance & Accounting' },
        { name: 'IT & Software' },
        { name: 'Office Productivity' },
        { name: 'Personal Development' },
        { name: 'Design' },
        { name: 'Marketing' },
        { name: 'Lifestyle' },
        { name: 'Photography & Video' },
        { name: 'Health & Fitness' },
        { name: 'Music' },
        { name: 'Teaching & Academics' },
        { name: 'Language' },
        { name: 'Data Science' },
        { name: 'Engineering' },
        { name: 'Math & Science' },
        { name: 'Social Science' },
        { name: 'Arts & Crafts' },
        { name: 'Food & Beverage' },
    ]

    for (const category of categories) {
        await prisma.category.upsert({
            where: { name: category.name },
            update: {},
            create: category,
        })
    }

    console.log('Categories seeded successfully')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })