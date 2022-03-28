import { Person } from '@modules/people/infra/typeorm/entities/Person';
import { IPeopleRepository } from '@modules/people/repositories/IPeopleRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class ListPeopleUseCase {
  constructor(
    @inject('PeopleRepository')
    private peopleRepository: IPeopleRepository
  ) {}

  async execute(): Promise<Person[]> {
    const people = await this.peopleRepository.list();

    return people;
  }
}
