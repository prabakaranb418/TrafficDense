import pandas as pd
import pickle
traffic_data=pd.read_csv('TrafficDense_final.csv')
x=traffic_data.drop(columns=['label'])
y=traffic_data['label'].map({'Free-flow':0,'Moderate':1,'Heavy':2,'Gridlock':3})
print('data seperated')

from sklearn.model_selection import train_test_split
x_train,x_test,y_train,y_test = train_test_split(x,y,test_size=0.2,random_state=18)

import xgboost as xgb
model=xgb.XGBClassifier(n_estimators=100,max_depth=2,learning_rate=0.1)
model.fit(x_train,y_train)
print('model trained')

y_pred=model.predict(x_test)

from sklearn.metrics import accuracy_score
print(accuracy_score(y_test,y_pred))

with open('TrafficDense_model.pkl','wb') as f:
    pickle.dump(model,f)
print('model dumped')
