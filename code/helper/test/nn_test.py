import helper.nn as nn
import numpy as np


def test_expand_y():
    _, y = nn.load_data('./helper/test/test_data/ex4data1.mat')

    expand = nn.expand_y(y)

    assert np.all(np.argmax(expand, axis=1) + 1 == y)  # map np index to raw data


def test_serial_deserial():
    t1, t2 = nn.load_weight('./helper/test/test_data/ex4weights.mat')

    o1, o2 = nn.deserialize(nn.serialize(t1, t2))

    assert np.all(o1 == t1)
    assert np.all(o2 == t2)


def test_expand_array():
    arr = np.arange(np.random.randint(2, 10))
    mat = nn.expand_array(arr)

    for vec in mat:
        assert np.all(vec == arr)
