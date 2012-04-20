April 20: Meeting 1
=========================
    
> Note: Everything mentioned below refers to core Python, not Scipy / Numpy.

## Variables and data types

*   Python is a dynamically typed, interepreted language. This means
    that variables are not declared before use, i.e. you don't have to
    allocate your own memory, and you don't have to specify strict variable
    types. Variables are defined in-place, and can be overwritten:
    
        >>> a = 15
        >>> a = "I'm here for an argument"

----------------

*   Some basic variable types in Python:
    
    *   Integers (``int``) represent integer numbers, as you would expect. Without getting
        in to too much detail, Python integers have unlimited precision. But the details
        aren't really important: Python does its best to make integers behave like they do
        in real life (very large integers are integers too!). There are ways (with Numpy
        and Scipy) to enforce C data types (if you want to save memory, for instance), but
        we will talk about that later.
        
            >>> anInt = 1024
            >>> anInt ** 50
            3273390607896141870013189696827599152216642046043064789483291368096133796404674554883270092325904157150886684127560071009217256545885393053328527589376
            
    *   The floating point (``float``) data type handles decimal numbers. They are by 
        default double precision, but again there are more options in Numpy and Scipy.
        
            >>> aFloat = 14.1345124
            
    *   Complex numbers (``complex``) can be created using a lower-case letter j.

            >>> aComplex = 14.5 + 11j
            >>> print(aComplex.real)
            14.5
            >>> print(aComplex.imag)
            11.0
    *   Finally, there is another way to handle decimal numbers, and that is with the
        ``decimal`` module. As they put it, "it is based on a floating-point model which 
        was designed with people in mind, and necessarily has a paramount guiding principle 
        – computers must provide an arithmetic that works in the same way as the arithmetic 
        that people learn at school!" Decimal numbers can be represented **exactly**; 
        1.1 and 2.2 don't have exact representations in binary floating point, but with
        the ``decimal`` module they do! The trade-off is more characters for exact
        arithmetic...
            
            >>> from decimal import Decimal
            >>> 0.1 + 0.1 + 0.1 - 0.3
            5.551115123125783e-17
            >>> Decimal('0.1') + Decimal('0.1') + Decimal('0.1') - Decimal('0.3')
            Decimal('0.0')

*   That brings us to arithmetic! All of the usual operators exist in Python, ``+``, ``-``, 
    ``/``, ``*``. Where **Python 3** differs from older versions, and other languages, 
    is with division. 
    
        >>> 4 + 5
        9
        >>> 4 - 11
        -7
        >>> 4 * 13
        52
        >>> 13 / 4
        3.25
    
    Notice that Python didn't preserve the data type in the last case! The idea
    is to make arithmetic more *natural*. To some programmers, this was an outrageous move,
    but I'd argue it makes sense! The only reason we expect an integer to be returned is 
    because that's the "status quo." Anyways, the developers added a new operator, ``//``,
    which acts like old-style divison:
        
        >>> 13 / 4
        3.25
        >>> 13 // 4
        3
    
    <div class="note">For Python 2 users, add this line to the top of your code to get
        Python 3-like division!
        
        from __future__ import division
        
    </div>
    
    Exponentiation is done with the ``**`` operator:
        
        >>> 4 ** 50
        1267650600228229401496703205376
    
    The modulus is done with the ``%`` operator:
        
        >>> 50 % 11
        6
    
    The four basic operators, ``+``, ``-``, ``/``, ``*``, can also be used with the 
    assignment operator as a shorthand:
        
        >>> a = 11
        >>> a = a + 15
    
    is equivalent to
        
        >>> a = 11
        >>> a += 15
    
    Here are some examples:
        
        >>> a = 11
        >>> a *= 50
        >>> a /= 17
        >>> a -= 4

*   Logical operators are words, not symbols!
        
        >>> a = 1
        >>> b = 42
        >>> (a > 0) and (b < 100)
        True
        >>> (a > 0) or (b < 10)
        True
        >>> not a > 0
        False
    
    You can also do compound operations, like:
    
        >>> a = 42
        >>> 150 > a > 11
        True

*   You can check the type of a variable by using the ``type()`` function. We'll
    talk in detail about functions later, but it's nice to be able to quickly check
    the variable type:
        
        >>> a = 15
        >>> type(a)
        <class 'int'>

*   There are also sequence and collection-type variables in Python. All of 
    the following objects can be *iterated* over. For example, I can loop 
    through all values in a list without ever touching the indices of the 
    values.
    
    *   Strings (``str``) are sequences of characters, and are created
        with either single or double quotes. 
        
            >>> aString = "An African or European swallow?"
            or
            >>> aString = 'An African or European swallow?'
        
        By default they are ASCII strings, but by placing a ``U`` in front of the 
        quotes when declaring a variable you can make it a Unicode (UTF-8) string, 
        but you must declare the coding of the file to be Unicode by placing this 
        at the very top of your script:
      
            # coding: utf-8
        
    *   Lists (``list``) are ordered, mutable sequences or collections of
        objects. Lists can contain multiple object types, and can be iterated
        over. Lists are mutable, meaning they can be modified in place. Lists
        are created with *square brackets*:
        
            >>> aList = [1, 15, "Coffee"]
        
    *   Tuples (``tuple``) are ordered, immutable sequences or collections
        of objects. Tuples can contain multiple object types, and can be
        iterated over. Tuples are very similar to lists, but are immutable.
        Tuples are created with *parentheses*:
        
            >>> aTuple = (1, 15, "Coffee")
        
    *   Sets (``set``) are unordered, mutable collectsions of *hashable*
        objects. Sets can contain multiple object types, and can be iterated
        over, but will only maintain one value for any given hash. For this
        reason, sets can be used for quickly getting all unique values of a list.
        Sets are created by passing another sequence-type object to the ``set()``
        function. 
        
            >>> aSet = set([1, 1, 2, 3, 5, 8])
            >>> print(aSet)
            {8, 1, 2, 3, 5}
        
        Note it's unordered, and the resulting set (in this example) is a *unique* 
        collection of the objects in the list we passed to the function.

*   Assignment and reference semantics. Consider the following example:
    
        >>> a = [1, 2, 3]
        >>> b = a
        >>> a[1] = 100
        >>> print(b)
        [1, 100, 3]
    
    Why does this happen? The assignment operation, ``b = a`` in this case, assigns
    a reference to the memory that ``a`` points to: it **doesn't** copy the contents 
    of ``a``. This is because lists are *mutable* objects. Note that for immutable
    objects, this does not happen:
        
        >>> x = 3
        >>> y = x
        >>> x = 4
        >>> print(y)
        3          

*   Working with sequences

    *   Sequence-type objects implement the ``+`` operator, but perhaps not in the
        way you might be familiar with (from IDL, say). Adding two sequence-type 
        objects will create a new object with the contents of *both* objects **it is 
        not element-wise addition!**
        
            >>> a = [1, 2, 3]
            >>> b = [4, 5, 6]
            >>> a + b
            [1, 2, 3, 4, 5, 6]
        
        The same is true for strings:
            
            >>> a = "Nobody expects the "
            >>> b = "Spanish Inquisition!"
            >>> a + b
            'Nobody expects the Spanish Inquisition!'
        
    *   Sets behave a little bit differently, but I'll defer discussion about these
        objects for now...
    
    *   Sequence-type objects can be **sliced**, meaning you can select subsets 
        of the objects:
            
            >>> a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            >>> a[1:5]
            [2, 3, 4, 5]
        
        The notation ``a[1:5]`` means *"select out the objects from index 1 up to but
        not including the object at index 5"*. Omitting one of the indices here will
        select either from the first item or to the last item, for example:
            
            >>> a[:5]
            [1, 2, 3, 4, 5]
            >>> a[5:]
            [6, 7, 8, 9, 10]
        
        Remember the section above on assignment and object referencing? ``list1 = list2`` 
        does not copy list2 into list1, but rather list1 will *reference* the same place
        in memory as list2. An easy way to create a copy of a list or sequence is to slice
        the list but *leave out both indices*.
            
            >>> a = [1, 2, 3]
            >>> b = a
            creates a new reference to a
            >>> b = a[:]
            creates a copy of list a and assigns it to b
        
        You can think of this as *"slice list a from the beginning to the end"*, so it's 
        really pulling out the whole collection of objects and making a copy because that's
        what the slice operator does -- it creates a new object based on a subset of the 
        object you are slicing.
        
        One other useful operator for sequences is the ``in`` operator. This will check
        to see if a given object is in the sequence you specify:
        
            >>> a = [1, 2, 3]
            >>> 2 in a
            True
        
        Lastly, you may want to know the length of your sequence! You can do this with
        the ``len()`` function:
            
            >>> a = [1, 2, 3]
            >>> len(a)
            3

*   if statements and loops (white space not curly braces!)
    
        TODO: fill this in

*   Comments
    
        TODO: fill this i

*   For any object in Python, there is a built-in function ``dir()`` that will return
    the *namespace* of the object. TODO: explain namespace and dir
    Other built-in functions [are listed here](http://docs.python.org/library/functions.html).

*   Python code is not (ish) checked at compile time. One consequence of this 
    is that some errors can remain hidden until a seemingly benign change in
    code. Consider [this example script](https://github.com/adrn/PythonBeer/blob/master/Meeting%201%20--%20Python%20Introduction/RuntimeChecking.py). 
    We clearly mistyped the variable ``name`` in the first clause of the 
    ``if`` statement (``nzme``), but this code will run because the interpreter 
    won't enter the top ``if`` block until the condition ``name == "Arthur"`` 
    evaluates to ``True``.

*   String formatting
    TODO: fill this in