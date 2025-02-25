using Unity.Mathematics;
using Unity.VisualScripting;
using UnityEditor.Search;
using UnityEngine;

public class Player : MonoBehaviour
{  
   private SpriteRenderer spriteRenderer;
   public Sprite[] runSprites;
   public Sprite climbSprite;
   private int spriteIndex;
  
  
   private new Rigidbody2D rigidbody;
   private new Collider2D collider;
  
  
   private Collider2D[] results;
   private Vector2 direction;
  
  
   public float moveSpeed = 1f;
   public float jumpStrenght = 1f;

   private bool grounded;
   private bool climbing;


   private void Awake()
   { spriteRenderer = GetComponent<SpriteRenderer>();
     rigidbody = GetComponent<Rigidbody2D>();
     collider = GetComponent<Collider2D>();
     results = new Collider2D[4];// 4 is the max no of object to be collided with
   }

    private void OnEnable()
    {
       InvokeRepeating(nameof(AnimateSprites), 1f/12f, 1f/12f);
    }

    private void OnDisable()
    {
        CancelInvoke();
    }
   private void CheckCollision()
   { 
     grounded = false;
     climbing = false;
     Vector2 size = collider.bounds.size;
      size.y += 0.1f;//this is done to make sure mario is collided with the platform.
      size.x /= 2f; // for making the mario look like its climbing through the ladder other wise 
      //it looks like the mario is climbing outside the ladder.
      int amount = Physics2D.OverlapBoxNonAlloc(transform.position, size, 0f, results);
      //amount of things to be overlapped with.
      for(int i=0; i<amount;i++)
      {
         GameObject hit = results[i].gameObject;
         if(hit.layer == LayerMask.NameToLayer("Ground")){
            grounded = hit.transform.position.y < (transform.position.y - 0.5f);
            // this is because when you jump you make collide with the upper object and then
            // also mario will looks like it is grounded which is the issue there fore to solve this 
            //we have to this. -05f because we have to check the mario feet for wheather it is 
            // frounded or not.
            Physics2D.IgnoreCollision(collider, results[i], !grounded);
            //this is so that the mario will not collide with the uppaer object and get stuck
         }else if(hit.layer == LayerMask.NameToLayer("Ladder")){
            climbing = true;
         }

         
      }
   }

   private void Update()
   {
    CheckCollision();
    if(climbing){
        direction.y = Input.GetAxis("Vertical")*moveSpeed;
    }
    else if(grounded && Input.GetButtonDown("Jump")){
        direction = Vector2.up * jumpStrenght;
    }else{
        direction += Physics2D.gravity *Time.deltaTime;
    }
    direction.x = Input.GetAxis("Horizontal")*moveSpeed;
    if(grounded){
        direction.y = Mathf.Max(direction.y , -1f);
    }
    
    if(direction.x > 0f){
       transform.eulerAngles = Vector3.zero;
    }else{
        transform.eulerAngles = new Vector3(0f , 180, 0f); 
    }
   }

   private void FixedUpdate()
   {
    rigidbody.MovePosition(rigidbody.position + direction *Time.fixedDeltaTime);
   }

   private void AnimateSprites()
   {
       if(climbing){
        spriteRenderer.sprite = climbSprite;
       }else if(direction.x != 0f)
        {
        spriteIndex++;

        if(spriteIndex >= runSprites.Length){
            spriteIndex = 0;
        }
        spriteRenderer.sprite = runSprites[spriteIndex];
       }
   }

   private void OnCollisionEnter2D(Collision2D collision)
   {
      if(collision.gameObject.CompareTag("Objective")){
           enabled = false;
           FindObjectOfType<GameManager>().LevelComplete();
      }else if(collision.gameObject.CompareTag("Obstacle")){
            enabled = false;
            FindObjectOfType<GameManager>().LevelFailed();
      }
   }
}
