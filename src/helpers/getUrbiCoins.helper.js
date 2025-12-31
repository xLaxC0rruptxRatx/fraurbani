import { requests } from './index.js'

const getUrbiCoins = async(req) => {
      //req.body.add_urbicoins = 50
  //console.log(req.body)
  const id = req.body.user_id
  
  const body = { user_id: id, add_urbicoins: 1 }
  //for (let i = 0; i < 15; i++) {
  try {
    const resp = await requests(
      req,
      `https://app.urbani.io/app/p/addPoints`,
      'POST',
      body
    );
    
    return resp.new_coins

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error API externa" });
 // console.log('ap')
  }
  //} 
}

export default getUrbiCoins