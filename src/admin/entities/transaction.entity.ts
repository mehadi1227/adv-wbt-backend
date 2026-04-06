import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Generated,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { ProfileEntity } from './profile.entity';

export type TransactionType = 'payment' | 'refund' | 'credit' | 'debit' | 'transfer';

export type TransactionStatus = 'pending' | 'success' | 'failed' | 'cancelled' | 'refunded';

@Entity('transactions')
export class TransactionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  @Generated('uuid')
  transaction_no: string;

  @ManyToOne(() => ProfileEntity, transaction_to => transaction_to.recieve_transactions, { nullable: false , cascade: false})
 @JoinColumn()
  transaction_to: ProfileEntity;

  @ManyToOne(() => ProfileEntity, issued_by => issued_by.issued_transactions, { nullable: false , cascade: false})
 @JoinColumn()
  issued_by: ProfileEntity;

  @Column({ nullable: true })
  order_id: string;

  @Column()
  type: TransactionType;

  @Column({ default: 'pending' })
  status: TransactionStatus;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  amount: number;

  @Column({ length: 10, default: 'BDT' })
  currency: string;

  @Column({ nullable: false })
  payment_method: string;

  @Column({ type: 'timestamp' })
  transaction_date: Date;

  @Column('text', { nullable: true })
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}