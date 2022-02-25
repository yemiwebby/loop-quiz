import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  HttpErrors,
  param,
  response,
} from '@loopback/rest';
import {Question} from '../models';
import {QuestionRepository} from '../repositories';

export class QuestionController {
  constructor(
    @repository(QuestionRepository)
    public questionRepository: QuestionRepository,
  ) {}
  @get('/questions/count')
  @response(200, {
    description: 'Question model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Question) where?: Where<Question>): Promise<Count> {
    return this.questionRepository.count(where);
  }
  @get('/questions')
  @response(200, {
    description: 'Array of Question model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Question, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Question) filter?: Filter<Question>,
  ): Promise<Question[]> {
    return this.questionRepository.find(filter);
  }
  @get('/questions/{id}')
  @response(200, {
    description: 'Question model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Question, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Question, {exclude: 'where'})
    filter?: FilterExcludingWhere<Question>,
  ): Promise<Question> {
    return this.questionRepository.findById(id, filter);
  }
  @del('/questions/{id}')
  @response(403, {
    description: 'Question DELETE not permitted',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    throw new HttpErrors.Forbidden('Question DELETE not permitted');
  }
}
