import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn import linear_model
model = linear_model.LinearRegression()


# 读取数据并初步绘制出数据点分布图
path = r'E:\Output\pan\Coursera-ML-AndrewNg-Notes\code\ex1-linear regression\ex1data1.txt'
data = pd.read_csv(path, header=None, names=['Population', 'Profit'])
data.head()
data.plot(kind='scatter', x='Population', y='Profit', figsize=(12, 8))
plt.show()

data.insert(0, 'Ones', 1)
# set X (training data) and y (target variable)
cols = data.shape[1]
X = data.iloc[:, 0:cols-1]  # X是所有行，去掉最后一列
y = data.iloc[:, cols-1:cols]  # X是所有行，最后一列
X.head()  # head()是观察前5行
y.head()

X = np.matrix(X.values)
y = np.matrix(y.values)
model.fit(np.asarray(X), np.asarray(y))

x = np.array(X[:, 1].A1)
f = model.predict(np.asarray(X)).flatten()

fig, ax = plt.subplots(figsize=(12, 8))
ax.plot(x, f, 'r', label='Prediction')
ax.scatter(data.Population, data.Profit, label='Training Data')
ax.legend(loc=2)
ax.set_xlabel('Population')
ax.set_ylabel('Profit')
ax.set_title('Predicted Profit vs. Population Size')
plt.show()
