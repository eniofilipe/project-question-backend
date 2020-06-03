import * as dotenv from 'dotenv';
import App from './App';

dotenv.config();
App.listen(process.env.PORT || 5000);
