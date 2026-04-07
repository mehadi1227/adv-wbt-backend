import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { generateCustomId } from '../../common/utils/generate-id.util';
import { LedgerEntity } from './ledger.entity';

@Entity('accountants')
export class AccountantEntity {
  @PrimaryColumn({ type: 'varchar', length: 25 })
  id: string;

  @Column({ type: 'varchar', length: 150 })
  fullName: string;

  @Column({ type: 'varchar', length: 150, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 20 })
  phone: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  address?: string | null;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

 
  // @OneToMany(() => TransactionEntity, (transaction) => transaction.processedBy)
  // processedTransactions: TransactionEntity[];

  @OneToMany(() => LedgerEntity, (ledger) => ledger.accountant)
  ledgerEntries: LedgerEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  generateId() {
    this.id = generateCustomId('ACC');
  }
}
