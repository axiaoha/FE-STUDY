// separate variables like ref
{
  let x = 0;
  let y = 0;
  function updateNumber() {
    x = 2;
    y = 3;
  }
}

// single object,like reactive
{
  const pos = {
    x: 0,
    y: 0,
  };
  function updateObject() {
    pos.x = 3;
    pos.y = 3;
  }
  const { x } = pos;
  pos.x = 4;
  console.log("x:", x); // 0
  console.log("pos.x", pos.x); //4
}
