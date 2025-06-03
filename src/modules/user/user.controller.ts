import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { BaseController, Route } from '../../common';
import { validate } from '../../validate';
import { UserRegDto } from './dto';
import { UserService } from './user.service';

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(UserService)
    private readonly service: UserService,
  ) {
    super();
    this.initRoutes();
  }

  initRoutes() {
    const routes: Route[] = [
      { path: '/register', method: 'post', handler: this.register },
      { path: '/login', method: 'post', handler: this.login },
      { path: '/profile', handler: this.getProfile },
      { path: '/updateProfile', method: 'put', handler: this.updateProfile },
    ];

    this.addRoute(routes);
  }

  register(req: Request, res: Response) {
    const instance = validate(UserRegDto, req.body);
    const user = this.service.register(instance);
    res.json(user);
  }
  login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = this.service.login({ email, password });
    res.json(user);
  }
  getProfile(req: Request, res: Response) {
    const instance = validate(UserRegDto, req.body);
    const user = this.service.register(instance);
    res.json(user);
  }
  updateProfile(req: Request, res: Response) {
    const user = this.service.updateProfile(req.params.id, req.body);
    res.json(user);
  }
}
