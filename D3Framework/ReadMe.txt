/*
Assignment6: Simulation dashboards
Uijin Lee
Hagyeong Kim
*/

1.What did you learned or what insight did you gained about simulation dashboards?

We learned about Kernel Density Estimation, Jitter, blowup game, and Monte Carlo simulation.
Kernel Density Estimation estimates the probability distribution of a random variable,so we can use this for calculating density of a graph by random number data from simulations.
In addition, we could learn about jitter. Jitter is a method of adding some noise to a data value. By adding noise to the data value in this way, we can move the position of the data value little by little. Therefore, we can avoid overdrawing the data by using jitter.
Also, we had never heard about the 'blow-up game' because this is not our native culture. So we could learn about the blow-up game and what the word 'blow up' means. It was a pretty fun time to learn about them with the Monte Carlo simulation.

2.What is your experience with D3? What went well? What did not go well?

This course is our first experience with D3 and javascript. So we were having a hard time learning about this language and its functions. Fortunately, however, the professor gave us a great template for this project. So we could completely make this project well without any terrible issues even if we are not confident in programming using them.
Especially, we have struggled with updateChart functions. It took a long time to be realized that 'svg' can be updated instead of removed and drawn again. 'remove' functions disturb animation functions such as transition and duration, so we should update the information of SVG instead of removing and drawing again.

3.Given 1.5x multiplier and 10% chance of blowing up each trial, if you had $100,000 (multiply input/output numbers by 1000 in your head) what percent of 
your money would you bet in each of 20 trials? Why?

When the multiplier is 1.5 and the chance of blowing up each trial is 10%, we will bet 10% of the money. Especially since the chance of blowing up is 10%, there is no guarantee that we will definitely get the money. In this game, we would not bet a lot of money at once even if we could win a lot of money because we want to be guaranteed at least the capital when betting our money. Therefore, we referred to the dashboard. We came to know that it would be good to bet 10%, which is estimated to be the amount that will protect our capital as much as possible. However, if the chance of blowup is lower, we will bet more money.