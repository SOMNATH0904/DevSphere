using UnityEngine;

public class Spawner : MonoBehaviour
{
    public GameObject prefab;
    public float minTime = 2f;
    public float maxTime = 4f;

    private void Start()
    {
       Spawn();
    }

    private void Spawn()
    {
       Instantiate(prefab, transform.position, Quaternion.identity);// quaternion is for rotation
       // identity means no rotation. its basic definition.
       Invoke(nameof(Spawn), Random.Range(minTime, maxTime));
    }
}
