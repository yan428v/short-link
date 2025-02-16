import {
    Table,
    Column,
    Model,
    DataType,
    HasMany,
    CreatedAt,
    UpdatedAt,
} from 'sequelize-typescript';
import { Click } from './click.model';

@Table({
    tableName: 'links',
    timestamps: true,
})
export class Link extends Model {
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    })
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    shortUrl: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    originalUrl: string;

    @Column({
        type: DataType.STRING(20),
        allowNull: true,
        unique: true,
    })
    alias: string | null;

    @Column({
        type: DataType.DATE,
        allowNull: true,
    })
    expiresAt: Date | null;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 0,
    })
    clickCount: number;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;

    @HasMany(() => Click, { foreignKey: 'linkId', onDelete: 'CASCADE' })
    clicks: Click[];
}
