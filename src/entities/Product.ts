import { v4 as uuidv4 } from 'uuid';
import { Column, CreateDateColumn, Entity, PrimaryColumn } from '../../node_modules/typeorm/index';
import { IsNotEmpty, Length } from '../../node_modules/class-validator';
// import { IsNotEmpty } from 'class-validator';

// Entidade mapeando o nosso banco, mas não ligado como entidade de banco que o desenvolvimento
// é atrelado a modelagem do banco, usamos para criar a nossa migration e depois usaremos Repositories
@Entity()
export class Product {
    @PrimaryColumn()
    id?: string

    @Column({
        length: 255,
    })
    // Validação do class-validator, valida o campo informando que não pode ser vazio e minimo e máximo de um campo
    @IsNotEmpty({
        message: 'O campo nome é obrigatório',
    })
    @Length(3, 255)
    name: string

    @Column({
        length: 255,
    })
    @Length(3, 255)
    description: string

    @Column()
    @IsNotEmpty()
    price: number

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamp'
    })
    createdAt?: Date;

    constructor(id?: string) {
        if (!this.id) this.id = uuidv4();
        // this.name = name;
        // this.description = description;
        // this.price = price;
    }
}