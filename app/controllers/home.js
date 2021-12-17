const yup = require('yup');

module.exports = (app)=>{
    
    const User = app.models.user

    const HomeController = {
        show(req, res){
            const users = ["Naruto", "goku", "Saitama", "Hantaro"];

            return res.status(200).json({
                error: false,
                users
            })
        }, 
        async store(req, res){

            //validation yup - start 
            let schema = yup.object().shape({
              name: yup.string().required(),
              email: yup.string().email(),
              password: yup.string().required()
            });

            if(!(await schema.isValid(req.body))){
                return res.status(400).json({
                    error: true,
                    message: "Not possible create user"
                });
            }
            //validation yup - end

            //input data
             const {name, email, password} = req.body;
             const data = {name, email, password};

             
             //create 
             await User.create(data, (err)=> {
                if(err)
                    return res.status(400).json({
                        error: true,
                        message: "Not Create"
                    });
                else
                    return res.status(200).json({
                        error: false,
                        message: "Yes create"
                    });
             });
        }
    } 
    return HomeController;
}