import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
    CreatedAt,
    UpdatedAt,
    AfterCreate,
    AfterDestroy,
} from 'sequelize-typescript';
import { Link } from './link.model';

@Table({
    tableName: 'clicks',
    timestamps: true,
})
export class Click extends Model {
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
    })
    ipAddress: string;

    @CreatedAt
    clickedAt: Date;

    @UpdatedAt
    updatedAt: Date;

    @ForeignKey(() => Link)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    linkId: number;

    @BelongsTo(() => Link, { foreignKey: 'linkId', onDelete: 'CASCADE' })
    link: Link;

    @AfterCreate
    static async increaseClickCount(clickModel: Click) {
        await Link.increment('clickCount', {
            by: 1,
            where: { id: clickModel.linkId },
        });
    }

    @AfterDestroy
    static async decreaseClickCount(clickModel: Click) {
        await Link.decrement('clickCount', {
            by: 1,
            where: { id: clickModel.linkId },
        });
    }
}
