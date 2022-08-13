import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { Client } from './client';
import { Person } from './person';

@Entity('banker')
export class Banker extends Person {
  @Column({
    length: 10,
    unique: true,
  })
  employee_number: string;

  @ManyToMany(() => Client, {
    cascade: true,
  })
  @JoinTable({
    name: 'bankers_clients',
    joinColumn: {
      name: 'banker',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'client',
      referencedColumnName: 'id',
    },
  })
  clients: Client[];
}
