from flask import Flask,render_template,request
import pickle

app=Flask(__name__)

with open('TrafficDense_model.pkl', 'rb') as model_file:
    model = pickle.load(model_file)


@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict',methods=['POST'])
def predict():
    road_seg_id = request.form.get('road_seg_id', '')
    hour = request.form.get('hour', '')
    minute = request.form.get('minute', '')
    avg_speed_kmph = request.form.get('avg_speed_kmph', '')
    queue_length_veh = request.form.get('queue_length_veh', '')
    density_veh_per_km = request.form.get('density_veh_per_km', '')
    if not all([road_seg_id,hour,minute,avg_speed_kmph,queue_length_veh,density_veh_per_km]):
        return render_template('index.html', prediction='Please fill in all fields.')

    try:
        features = [[
            int(road_seg_id),
            int(hour),
            int(minute),
            float(avg_speed_kmph),
            float(queue_length_veh),
            float(density_veh_per_km)
        ]]
    except ValueError:
         return render_template('index.html', prediction="please enter valid numeric values.")


    result = model.predict(features)[0]

    labels = ['Free-flow','Moderate','Heavy','Gridlock']
    return render_template('index.html', prediction=f'Predicted congestion : {labels[result]}.')

if __name__ == "__main__":
    app.run(debug=True)