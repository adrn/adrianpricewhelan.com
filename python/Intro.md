# Introduction

*   If you see code blocks below with ``>>>``, this means you should follow along 
    with the example by typing and executing code directly in the Python interpreter 
    (e.g., type ``python`` in your terminal and type into the new prompt). If you 
    see a code block formatted like this

        # Some_File_Name.py
    
        Code here!

    this means you can either create a new Python file (module) with the
    specified name (e.g., Some_File_Name.py) and type the code yourself, or find the
    script in the [GitHub repository](http://github.com/adrn/Python-Columbia) and 
    just follow along. Either way, you should try running the script! The accompanying 
    explanation should explain what is going on. 

*   To run a Python module, you just type ``python module_name.py`` in your terminal.

*   I'm going to use Python 3 notation unless otherwise noted. If you're 
    using Python 2, you may (in some cases) need to add some imports to 
    the top of your code that will look something like this:
    
        from __future__ import <stuff here>
    
    If you plan to use Python 2, let me know and I can help you with the 
    details.
*   There is a [Python style guide](http://www.python.org/dev/peps/pep-0008/), and you 
    should look at it at least once. It has some simple, explicit recommendations, for 
    example always padding the assignment operator with spaces (except in function calls):
        
        >>> a = 10
        NOT
        >>> a=10
        UNLESS
        >>> a(b=10)
    
    But it also contains some broader things to keep in mind. 
*   Whitespace means something to the Python interpreter! There are no curly braces
    in Python, so you denote blocks by indenting text. You should use 4 spaces to
    indent a line, *not* tabs! Most smart text editors have an option to bind the
    tab key to 4 spaces instead of a tab. 
*   Definitely check out this tutorial put together by some great people,
    specifically targeted to Astronomers: [Python4Astronomers](http://python4astronomers.github.com/).
*   **The Zen of Python**, by Tim Peters

        Beautiful is better than ugly.
        Explicit is better than implicit.
        Simple is better than complex.
        Complex is better than complicated.
        Flat is better than nested.
        Sparse is better than dense.
        Readability counts.
        Special cases aren't special enough to break the rules.
        Although practicality beats purity.
        Errors should never pass silently.
        Unless explicitly silenced.
        In the face of ambiguity, refuse the temptation to guess.
        There should be one-- and preferably only one --obvious way to do it.
        Although that way may not be obvious at first unless you're Dutch.
        Now is better than never.
        Although never is often better than *right* now.
        If the implementation is hard to explain, it's a bad idea.
        If the implementation is easy to explain, it may be a good idea.
        Namespaces are one honking great idea -- let's do more of those!