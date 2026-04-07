import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { generateCustomId } from '../../common/utils/generate-id.util';
import { LedgerEntryType } from '../accountant.enums';
import { AccountantEntity } from './accountant.entity';

@Entity('ledgers')
export class LedgerEntity {
  @PrimaryColumn({ type: 'varchar', length: 25 })
  id: string;

  @Column({ type: 'varchar', length: 40, unique: true })
  entryCode: string;

  @Column({ type: 'varchar', length: 120 })
  accountTitle: string;

  @Column({ type: 'text' })
  description: string;

  @Column({
    type: 'enum',
    enum: LedgerEntryType,
  })
  entryType: LedgerEntryType;

  @Column({ type: 'numeric', precision: 12, scale: 2 })
  amount: number;

  @Column({ type: 'date' })
  entryDate: string;

  @Column({ type: 'varchar', length: 60, nullable: true })
  referenceNo?: string | null;

  @ManyToOne(() => AccountantEntity, (accountant) => accountant.ledgerEntries, {
    eager: true,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'accountantId' })
  accountant: AccountantEntity;

  @Column({ type: 'varchar', length: 25 })
  accountantId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  generateIds() {
    this.id = generateCustomId('LED');
    this.entryCode = generateCustomId('LGR');
  }
}
