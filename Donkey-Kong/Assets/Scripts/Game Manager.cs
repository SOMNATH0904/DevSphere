using UnityEngine;

public class GameManager : MonoBehaviour
{
   private int lives;
   private int score;

   private void Start()
   {
      NewGame();
   }

   private void NewGame()
    {
       lives = 3;
       score = 0;

       // Level Loading....
    }

    public void LevelComplete()
    {
       score += 1000;

       // next level....
    }

    public void LevelFailed()
    {
        lives --;
        if(lives<=0){
            NewGame();
        }else{
            //reload current level....
        }
    }
   
}
