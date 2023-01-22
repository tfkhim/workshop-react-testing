
class: middle, center

# React Testing

.footnote[Project source: https://github.com/tfkhim/workshop-react-testing]

---

# Agenda

* Introduction
* Warmup exercise
* Web Testing Overview
* React Testing Library
* Exercise
* Tips & Tricks to improve testability

???

* Introduction
  * Motivation
  * Goals
* Warmup exercise
  * Miro
* Web Testing Overview
  * Frontend test pyramid
  * Test environments
  * Property to environment mapping
  * Tool matrix
- Testing React
  - Show you how you can test React in a unit test fashion
  - Then you can get some hands on experience for writing such tests
  - Exchange experience from the exercise and think about what makes testing hard
- Tips & Tricks
  - Show you some approaches, techniques and their disadvantages
  - Another hands on experience
  - Some discussion (because as with everything in software development: it always depends)

---

class: middle, center

# Motivation

Why a workshop about testing?

???

* Important part of software development
* Good software development is about minimizing the cost of change
* Helps to come up with a good software design
  * Testing gets more difficult if good design principles are violated
  * Single-Responsibility-Principle: Violation normally means a change leads
    to the adoption of many tests
  * Interface-Segregation-Prinziple: Violation makes mocking hard due to the
    amount of methods interfaces have
  * Inversion of control and dependency injection: Violation makes mocking
    hard or impossible
* You get an early look at the client side
  * How readable is the calling site
  * Ergonomic API
* Manual testing is expensive and boring
  * Boring tasks diminish motivation
  * Boring tasks lead to errors
* It gives us confidence that our changes do no harm
* Bringing together people from different teams
  * Each team faced different problems over time
  * And might have develop their own approaches to solve them
  * Exchanging them might result in an even better solution for them

---

class: middle, center

# Warmup

Think of different aspects or properties one might want to test in a web based
frontend application. 

Bonus: Which kind of environment would you use to test the property?

???

Timebox: 10 Minutes
* 2 Minutes collecting
* 8 Minutes presentation and discussion

Possible answers

| Property                                   | Environment                                    |
|--------------------------------------------|------------------------------------------------|
| Isolated functionality (Unit Test)         | fake browser environment                       |
| Visual appearance                          | real browser environment                       |
| Layout                                     | real browser environment                       |
| Code really works in a browser             | real browser environment                       |
| Integration of frontend code               | fake environemnt _or_ real browser environment |
| Integration with backend                   | fake environemnt _or_ real browser environment |
| Performance                                | real browser environment                       |
