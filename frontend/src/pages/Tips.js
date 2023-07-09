import "./Tips.css"
import { Link } from 'react-router-dom'

const Tips = () => {
  return (
    <div className="mt-4" >



      <p className="lh-lg mb-4"><b className="fw-bold">1. Set realistic goals: </b>Start with achievable goals that are specific, measurable, attainable, relevant, and time-bound (SMART goals). Gradually increase the intensity and duration of your workouts as you progress. </p>

      <p className="lh-lg mb-4"><b className="fw-bold">2. Warm up and cool down: </b>Always begin your workout with a warm-up session to prepare your body for exercise and reduce the risk of injury. Similarly, end your workout with a cool-down session to gradually lower your heart rate and stretch your muscles.</p>

      <p className="lh-lg mb-4"><b className="fw-bold">3. Mix up your routine: </b>Incorporate a variety of exercises into your routine to target different muscle groups and prevent boredom. This can include cardiovascular exercises (such as running, cycling, or swimming), strength training (using weights or resistance bands), and flexibility exercises (such as yoga or stretching).</p>

      <p className="lh-lg mb-4"><b className="fw-bold">4. Listen to your body: </b>Pay attention to how your body feels during and after exercise. If you experience pain or discomfort, modify or stop the exercise. It's important to find the right balance between pushing yourself and avoiding injury.</p>

      <p className="lh-lg mb-4"><b className="fw-bold">5. Stay hydrated: </b>Drink plenty of water before, during, and after your workouts to stay hydrated. This is especially important when engaging in intense or prolonged exercise.</p>

      <p className="lh-lg mb-4"><b className="fw-bold">6. Rest and recover: </b>Allow your body time to rest and recover between workouts. This allows your muscles to repair and grow stronger. Aim for at least one or two days of rest per week.</p>

      <p className="lh-lg mb-4"><b className="fw-bold">7. Stay consistent:</b> Consistency is key when it comes to exercise. Try to establish a regular workout schedule and stick to it. Even if you can only spare a few minutes each day, it's better than skipping workouts altogether.</p>

      <p className="lh-lg mb-4"><b className="fw-bold">Remember: </b> it's always a good idea to consult with a healthcare professional or a certified fitness trainer before starting a new exercise program, especially if you have any underlying health conditions.</p>

      <div class="d-flex justify-content-end">
        <Link to="/">
          <button className="my-4 text-end tips-button"> Back to the workout log </button>
        </Link>
      </div>
    </div>

  );
}

export default Tips;