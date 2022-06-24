import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DatabaseFile {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  fileName: string;

  @Column({
    type: 'bytea',
  })
  data: Uint8Array;
}
