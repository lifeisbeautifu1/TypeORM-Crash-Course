import { Entity, Column, OneToMany, ManyToMany } from 'typeorm';
import { Banker } from './banker';
import { Person } from './person';
import { Transaction } from './transaction';

@Entity('client')
export class Client extends Person {
  @Column({
    type: 'numeric',
  })
  balance: number;

  @Column({
    default: true,
  })
  active: boolean;

  @Column({
    type: 'simple-json',
    nullable: true,
  })
  additional_info: {
    age: number;
    hair_color: string;
  };

  @Column({
    type: 'simple-array',
    default: [],
  })
  family_members: string[];

  @ManyToMany(() => Banker, {
    cascade: true,
  })
  bankers: Banker[];

  @OneToMany(() => Transaction, (transaction) => transaction.client, {
    cascade: true,
  })
  transactions: Transaction[];
}
