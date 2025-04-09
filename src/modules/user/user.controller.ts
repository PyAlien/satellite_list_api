import { Request, Response, Router } from 'express';
import { validate } from '../../validate';
import { UserRegisterDto } from './dto';
import { userService } from './user.service';

export const userController = Router();

userController.post('/register', (req: Request, res: Response) => {
  const instance = validate(UserRegisterDto, req.body);

  const user = userService.register(instance);
  res.json(user);
});

userController.post('/login', (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = userService.login(username, password);
  res.json(user);
});

userController.get('/:id/profile', (req: Request, res: Response) => {
  const user = userService.getProfile(req.params.id);
  res.json(user);
});

userController.patch('/:id', (req: Request, res: Response) => {
  const user = userService.updateProfile(req.params.id, req.body);
  res.json(user);
});
