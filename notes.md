User
id: primary
username: string (optional)
email: string (validation: required, unique, email format)
password: string (validation: required, length min 5) wajib di-hash
role: string (default: Staff)

npx sequelize-cli model:create --name User --attributes email:string,password:string,role:string

Movie
id
title: string (validation: required)
synopsis: text (validation: required)
trailerUrl: string 
imgUrl: string
rating: integer (validation: min rating 1)

npx sequelize-cli model:create --name Movie --attributes title:string,synopsis:string,imgUrl:string,rating:integer,userId:integer

pass supabase
belajardatabase