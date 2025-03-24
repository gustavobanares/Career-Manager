import { app } from "./app";
import {env} from './env/index'

const PORT = env.PORT

app.listen(PORT, () => console.log(`Server is running at ${PORT} 🚀`))