import { Request, Response, Router } from 'express';
import { validate } from '../../validate';
import { UserRegDto } from './dto';
import { userService } from './user.service';

export const userController = Router();

userController.post('/reg', (req: Request, res: Response) => {
  const instance = validate(UserRegDto, req.body);
  const user = userService.reg(instance);
  res.json(user);
});

userController.post('/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = userService.login({ email, password });
  res.json(user);
});

userController.get('/:id/profile', (req: Request, res: Response) => {
  const user = userService.getProfile(req.params.id);
  res.json(user);
});

userController.put('/:id', (req: Request, res: Response) => {
  const user = userService.updateProfile(req.params.id, req.body);
  res.json(user);
});
