import { useState } from 'react'
import './App.css'

function App() {
  const [billTypes, setBillTypes] = useState([
    { type: 1000, amount: 0, included: true },
    { type: 500, amount: 0, included: true },
    { type: 100, amount: 0, included: true },
    { type: 50, amount: 0, included: true },
    { type: 20, amount: 0, included: true },
    { type: 10, amount: 0, included: true },
  ])
  const [newBillType, setNewBillType] = useState(100)

  const changeBillAmount = (billType, val) => {
    const newBillTypes = billTypes.map(el => {
      if (billType === el.type) {
        return { ...el, amount: val };
      }
      return el;
    });
    setBillTypes(newBillTypes);
  }

  const setTypeIncluded = (billType) => {
    const newBillTypes = billTypes.map(el => {
      if (billType === el.type) {
        return { ...el, included: !el.included };
      }
      return el;
    });
    setBillTypes(newBillTypes);

  }

  const billList = billTypes.length ? billTypes.map(billType => {
    return (
      <div>
        <h3>{billType.type}</h3>
        <input placeholder="Cantidad" onChange={(e) => changeBillAmount(billType.type, e.target.value)} value={billType.amount} type="number" />
        <input type="checkbox" onChange={() => setTypeIncluded(billType.type)} checked={billType.included} />
      </div>
    )
  }) : null;

  const addBillType = () => {
    const typeAlreadyExists = billTypes.some((el) => el.type === newBillType);
    if (typeAlreadyExists) {
      alert("Ya existe este tipo de billete")
      return;
    }
    const newBillTypes = [...billTypes, { type: newBillType, amount: 0 }]
    setBillTypes(newBillTypes);
  }

  const total = billTypes.reduce((sum, { type, amount, included }) => included ? sum + type * amount : sum, 0);

  return (
    <div className="App">
      <div className="grid">
        <section>
          <div>
            <h3>Agregar tipo de billete</h3>
            <input placeholder="Denominacion" onChange={(e) => setNewBillType(e.target.value)} value={newBillType} type="number" />
            <button onClick={addBillType}>Agregar</button>
          </div>
          <div className="bills">
            {billList}
          </div>
        </section>
        <section>
          <h3>Total: {total}</h3>

        </section>

      </div>
    </div>
  )
}

export default App
